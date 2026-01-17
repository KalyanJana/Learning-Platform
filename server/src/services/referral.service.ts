// src/services/referral.service.ts
import { User } from "../models/user.modal";
import { Referral } from "../models/referral.modal";
import { RewardTransaction } from "../models/rewardTransaction.modal";
import crypto from "crypto";

export class ReferralService {
  private readonly REFERRAL_BONUS = 250; // Points for referrer
  private readonly NEW_USER_BONUS = 200; // Points for new user with referral code

  /**
   * Generate a unique referral code
   */
  generateReferralCode(userId: string, userName: string): string {
    const timestamp = Date.now().toString(36);
    const randomStr = crypto.randomBytes(3).toString("hex").toUpperCase();
    const userInitials = userName.substring(0, 2).toUpperCase();
    return `${userInitials}${timestamp}${randomStr}`.substring(0, 12);
  }

  /**
   * Create referral code for a user (called during registration)
   */
  async createReferralCodeForUser(userId: string, userName: string) {
    const referralCode = this.generateReferralCode(userId, userName);

    const user = await User.findByIdAndUpdate(
      userId,
      { referralCode },
      { new: true },
    );

    return user;
  }

  /**
   * Register a user with a referral code
   */
  async registerWithReferralCode(
    newUserId: string,
    referralCode: string,
  ): Promise<{ referralCreated: boolean; message: string }> {
    try {
      // Find the referrer by referral code
      const referrer = await User.findOne({ referralCode });

      if (!referrer) {
        return {
          referralCreated: false,
          message: "Invalid referral code",
        };
      }

      // Update new user with referrer info
      await User.findByIdAndUpdate(newUserId, {
        referredByCode: referralCode,
      });

      // Create referral record
      const referral = await Referral.create({
        referrer: referrer._id,
        referredUser: newUserId,
        referralCode,
        status: "COMPLETED",
        rewardAmount: this.REFERRAL_BONUS,
        completedAt: new Date(),
      });

      // Award bonus points to referrer
      await User.findByIdAndUpdate(referrer._id, {
        $inc: {
          rewardPoints: this.REFERRAL_BONUS,
          referralCount: 1,
        },
      });

      // Award bonus points to new user
      await User.findByIdAndUpdate(newUserId, {
        $inc: {
          rewardPoints: this.NEW_USER_BONUS,
        },
      });

      // Create transaction records
      await RewardTransaction.create({
        user: referrer._id,
        referral: referral._id,
        amount: this.REFERRAL_BONUS,
        type: "CREDIT",
        reason: `Referral bonus for referring ${(await User.findById(newUserId))?.name}`,
      });

      await RewardTransaction.create({
        user: newUserId,
        referral: referral._id,
        amount: this.NEW_USER_BONUS,
        type: "CREDIT",
        reason: `Registration bonus with referral code`,
      });

      return {
        referralCreated: true,
        message: "Referral registered successfully",
      };
    } catch (error) {
      console.error("Error registering referral:", error);
      return {
        referralCreated: false,
        message: "Error processing referral",
      };
    }
  }

  /**
   * Get referral stats for a user
   */
  async getUserReferralStats(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Get all referrals made by this user
    const referrals = await Referral.find({ referrer: userId })
      .populate("referredUser", "name email mobileNo createdAt")
      .sort({ createdAt: -1 });

    // Get reward transactions
    const transactions = await RewardTransaction.find({ user: userId }).sort({
      createdAt: -1,
    });

    return {
      referralCode: user.referralCode,
      rewardPoints: user.rewardPoints || 0,
      totalReferrals: user.referralCount || 0,
      referredUsers: referrals.map((ref) => ({
        userId: ref.referredUser._id,
        name: ref.referredUser.name,
        email: ref.referredUser.email,
        mobileNo: ref.referredUser.mobileNo,
        enrolledDate: ref.referredUser.createdAt,
        rewardEarned: ref.rewardAmount,
        status: ref.status,
      })),
      transactionHistory: transactions.map((tx) => ({
        _id: tx._id,
        amount: tx.amount,
        type: tx.type,
        reason: tx.reason,
        date: tx.createdAt,
      })),
    };
  }

  /**
   * Validate referral code exists
   */
  async validateReferralCode(referralCode: string): Promise<boolean> {
    const user = await User.findOne({ referralCode });
    return !!user;
  }

  /**
   * Get leaderboard of top referrers
   */
  async getReferralLeaderboard(limit: number = 10) {
    const leaderboard = await User.find({ referralCount: { $gt: 0 } })
      .select("name referralCount rewardPoints email")
      .sort({ referralCount: -1 })
      .limit(limit);

    return leaderboard.map((user) => ({
      userId: user._id,
      name: user.name,
      email: user.email,
      totalReferrals: user.referralCount || 0,
      totalRewards: user.rewardPoints || 0,
    }));
  }
}
