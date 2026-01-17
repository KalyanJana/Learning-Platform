// src/api/referral.ts
import apiClient from "./apiClient";

export interface ReferralStats {
  referralCode: string;
  rewardPoints: number;
  totalReferrals: number;
  referredUsers: Array<{
    userId: string;
    name: string;
    email: string;
    mobileNo: string;
    enrolledDate: string;
    rewardEarned: number;
    status: string;
  }>;
  transactionHistory: Array<{
    _id: string;
    amount: number;
    type: "CREDIT" | "DEBIT";
    reason: string;
    date: string;
  }>;
}

export const getReferralStats = async (): Promise<ReferralStats> => {
  const res = await apiClient.get("/referrals/stats");
  return res.data;
};

export const validateReferralCode = async (
  code: string,
): Promise<{ valid: boolean; message: string }> => {
  const res = await apiClient.post("/referrals/validate", { code });
  return res.data;
};

export const getReferralLeaderboard = async (limit: number = 10) => {
  const res = await apiClient.get(`/referrals/leaderboard?limit=${limit}`);
  return res.data;
};
