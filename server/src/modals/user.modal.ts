import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  email: string;
  passwordHash: string;
  refreshTokenHash?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    refreshTokenHash: { type: String, default: null },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", userSchema);