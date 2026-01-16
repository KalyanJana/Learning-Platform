// src/services/user.service.ts
import { UserRepository } from "../repositories/user.repositories";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { notifyUserLogout } from "../index";
import { UserType } from "../types/user";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_123";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "1h";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

// Cast jwt.sign to any to bypass TS overload errors temporarily
const signToken = jwt.sign as unknown as (
  payload: string | object | Buffer,
  secretOrPrivateKey: string | undefined,
  options?: jwt.SignOptions
) => string;

interface JWTPayload {
  _id: string;
  mobileNo: string;
  email: string;
  name: string;
  role: string;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(
    userData: UserType
  ): Promise<{ user: UserType; accessToken: string; refreshToken: string }> {
    const existingUser = await this.userRepository.findByEmail(
      userData.email
    );
    if (existingUser) {
      throw new Error("Mobile number already in use");
    }

    console.log("User data", userData);

    const user = await this.userRepository.createUser({
      name: userData.name,
      mobileNo: userData.mobileNo,
      email: userData?.email || null,
      password: userData.password,
      role: userData.role,
    });

    const accessToken = signToken(
      { _id: user._id, email: user.email, name: user.name, mobileNo: user.mobileNo, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = signToken(
      { _id: user._id, email: user.email, name: user.name, mobileNo: user.mobileNo, role: user.role },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    console.log("user", user);

    await this.userRepository.addRefreshToken(user._id, refreshToken);

    return { user, accessToken, refreshToken };
  }

  async loginUser(credentials: {
    email: string;
    password: string;
  }): Promise<{ user: UserType; accessToken: string; refreshToken: string }> {
    console.log("Logging in with credentials:", credentials);
    const user = await this.userRepository.findByUserName(credentials.email);
    if (!user) {
      throw new Error("User not found");
    }

    notifyUserLogout(user._id.toString()).catch((err) =>
      console.error("notifyUserLogout error:", err)
    );

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = signToken(
      { _id: user._id, email: user.email, name: user.name, mobileNo: user.mobileNo, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = signToken(
      { _id: user._id, email: user.email, name: user.name, mobileNo: user.mobileNo, role: user.role },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );
    await this.userRepository.addRefreshToken(user._id, refreshToken);
    return { user, accessToken, refreshToken };
  }

  async refreshAccessToken(
    refreshToken: string
  ): Promise<{ accessToken: string }> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        JWT_SECRET
      ) as unknown as JWTPayload;

      const user = await this.userRepository.findByUserId(decoded._id);
      if (!user) {
        throw new Error("User not found");
      }

      const newAccessToken = signToken(
        { _id: user._id, email: user.email, mobileNo: user.mobileNo, name: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return {newAccessToken, user};
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }

  async logoutUser(_id: string, refreshToken: string): Promise<void> {
    await this.userRepository.removeRefreshToken(_id, refreshToken);
  }

  async fetchUserProfile(_id: string) {
    const user = await this.userRepository.findByUserId(_id);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      _id: user._id,
      name: user.name,
      mobileNo: user.mobileNo,
      role: user.role,
    };
  }
}
