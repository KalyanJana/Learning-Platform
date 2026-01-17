// models/Referral.ts
import { Schema, model } from "mongoose";

const referralSchema = new Schema(
  {
    referrer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    referredUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    referralCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
    },
    rewardAmount: {
      type: Number,
      default: 250,
    },
    completedAt: Date,
  },
  { timestamps: true },
);

// Prevent duplicate referrals
referralSchema.index({ referrer: 1, referredUser: 1 }, { unique: true });

export const Referral = model("Referral", referralSchema);
export default Referral;
