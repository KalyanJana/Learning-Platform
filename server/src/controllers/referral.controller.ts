// src/controllers/referral.controller.ts
import { Request, Response } from "express";
import { ReferralService } from "../services/referral.service";

const referralService = new ReferralService();

export const getUserReferralStats = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const stats = await referralService.getUserReferralStats(userId);
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const validateReferralCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Referral code is required" });
    }

    const isValid = await referralService.validateReferralCode(code);

    if (!isValid) {
      return res
        .status(400)
        .json({ valid: false, message: "Invalid referral code" });
    }

    res.json({ valid: true, message: "Referral code is valid" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getReferralLeaderboard = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const leaderboard = await referralService.getReferralLeaderboard(limit);
    res.json(leaderboard);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
