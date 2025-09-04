import { User, IUser } from "../models/user.modal";

export class UserRepository {
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }

  async findByUserId(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async addRefreshToken(userId: string, token: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { $push: { refreshTokens: token } });
  }

  async removeRefreshToken(userId: string, token: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { $pull: { refreshTokens: token } });
  }

  async findByRefreshToken(token: string): Promise<IUser | null> {
    return await User.findOne({ refreshTokens: token });
  }
}
