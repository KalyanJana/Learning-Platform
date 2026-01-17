// client/src/hooks/useCourseApprovalHooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPendingEnrollments,
  approveCourseEnrollment,
  rejectCourseEnrollment,
  getCourseApprovalStats,
} from "../api/courseApproval";

export function usePendingEnrollments() {
  return useQuery({
    queryKey: ["pendingEnrollments"],
    queryFn: getPendingEnrollments,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

export function useApproveEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      enrollmentId,
      reason,
    }: {
      enrollmentId: string;
      reason?: string;
    }) => approveCourseEnrollment(enrollmentId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingEnrollments"] });
      queryClient.invalidateQueries({ queryKey: ["courseApprovalStats"] });
    },
  });
}

export function useRejectEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      enrollmentId,
      reason,
    }: {
      enrollmentId: string;
      reason: string;
    }) => rejectCourseEnrollment(enrollmentId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingEnrollments"] });
      queryClient.invalidateQueries({ queryKey: ["courseApprovalStats"] });
    },
  });
}

export function useCourseApprovalStats() {
  return useQuery({
    queryKey: ["courseApprovalStats"],
    queryFn: getCourseApprovalStats,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
