import { UserModel } from "../models/user.model";

export class UserRepository {
  static async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  static async create(userData: { email: string; password: string }) {
    const user = new UserModel(userData);
    return user.save();
  }
}
