import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserType } from "../types/user";

const userSchema = new Schema<UserType>(
  {
    name: { type: String, required: true },
    mobileNo: { type: String, required: true, unique: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    refreshTokens: { type: [String], default: [] },
    role: {
      type: String,
      enum: ["student", "admin", "staff"],
      default: "student",
    },
    referralCode: { type: String, unique: true, sparse: true },
    referredByCode: { type: String, default: null },
    rewardPoints: { type: Number, default: 0 },
    referralCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

userSchema.pre<UserType>("save", async function (next) {
  if (!this.isModified("password")) return next(); //if password is not modified skip hashing
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt for hashing
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as any);
  }
});

userSchema.methods.toJSON = function () {
  // Customize JSON output
  const user = this.toObject();
  delete user.password;
  delete user.refreshTokens;
  return user;
};

export const User = mongoose.model<UserType>("User", userSchema);
