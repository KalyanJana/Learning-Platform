import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.util";
import { AuthTokens } from "../types/auth.types";

class AuthService {
  async register(email: string, password: string, name: string): Promise<AuthTokens> {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.create({ email, password: hashedPassword, name });

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    return { accessToken, refreshToken, user: newUser };
  }

  async login(email: string, password: string): Promise<AuthTokens> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return { accessToken, refreshToken, user };
  }

  async refreshTokens(token: string): Promise<Omit<AuthTokens, "user">> {
    const payload = verifyRefreshToken(token);
    if (!payload) {
      throw new Error("Invalid or expired refresh token");
    }

    const accessToken = generateAccessToken(payload.userId);
    const refreshToken = generateRefreshToken(payload.userId);

    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
