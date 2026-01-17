// src/routes/v1/referral/referral.routes.ts
import { Router } from "express";
import {
  getUserReferralStats,
  validateReferralCode,
  getReferralLeaderboard,
} from "../../../controllers/referral.controller";
import { authenticateAccessToken } from "../../../middlewares/auth.middleware";

const router = Router();

// Protected routes
router.get("/stats", authenticateAccessToken, getUserReferralStats);
router.get("/leaderboard", getReferralLeaderboard);

// Public routes
router.post("/validate", validateReferralCode);

export default router;
