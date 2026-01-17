// src/hooks/useReferralHooks.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getReferralStats,
  validateReferralCode,
  getReferralLeaderboard,
} from "../api/referral";

export function useReferralStats() {
  return useQuery({
    queryKey: ["referralStats"],
    queryFn: getReferralStats,
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useValidateReferralCode() {
  return useMutation({
    mutationFn: validateReferralCode,
  });
}

export function useReferralLeaderboard() {
  return useQuery({
    queryKey: ["referralLeaderboard"],
    queryFn: () => getReferralLeaderboard(10),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
