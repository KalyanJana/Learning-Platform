// src/services/user.service.ts
import { IUser } from "../models/user.modal";
import { UserRepository } from "../repositories/user.repositories";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_123";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";

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
  userId: string;
  username: string;
  email: string;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    if (userData.password !== userData.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const user = await this.userRepository.createUser({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    });

    // const userWithId = user as IUser & { _id: any };
    // const userId = userWithId._id.toString();

    const accessToken = signToken(
      { _id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = signToken(
      { _id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    await this.userRepository.addRefreshToken(user._id, refreshToken);

    return { user, accessToken, refreshToken };
  }

  async loginUser(credentials: {
    username: string;
    password: string;
  }): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {

    const user = await this.userRepository.findByUsername(credentials.username);
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    // const userWithId = user as IUser & { _id: any };
    // const userId = userWithId._id.toString();

    // console.log("user id", userId)

    const accessToken = signToken(
      { _id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = signToken(
      { _id: user._id, username: user.username, email: user.email },
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
        { _id: user._id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return newAccessToken;
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
      email: user.email,
      username: user.username,
    };
  }
}
