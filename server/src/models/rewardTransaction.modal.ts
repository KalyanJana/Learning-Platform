// models/RewardTransaction.ts
import { Schema, model } from "mongoose";

const rewardTransactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    referral: { type: Schema.Types.ObjectId, ref: "Referral" },
    amount: Number,
    type: { type: String, enum: ["CREDIT", "DEBIT"] },
    reason: String,
  },
  { timestamps: true },
);

export const RewardTransaction = model(
  "RewardTransaction",
  rewardTransactionSchema,
);
export default RewardTransaction;
