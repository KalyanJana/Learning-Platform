import { User } from "../models/user.modal";
import { UserType } from "../types/user";

export class UserRepository {
  async createUser(userData: Partial<UserType>): Promise<UserType> {
    const user = new User(userData);
    return await user.save();
  }
  
  async findByEmail(email: string): Promise<UserType | null> {
    return await User.findOne({ email });
  }

  async findByUserName(userName: string): Promise<UserType | null> {
    console.log("username", userName)
    return await User.findOne({ email: userName });
  }

  async findByUserId(id: string): Promise<UserType | null> {
    return await User.findById(id);
  }

  async addRefreshToken(userId: string, token: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { $push: { refreshTokens: token } });
  }

  async removeRefreshToken(userId: string, token: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { $pull: { refreshTokens: token } });
  }

  async findByRefreshToken(token: string): Promise<UserType | null> {
    return await User.findOne({ refreshTokens: token });
  }
}
