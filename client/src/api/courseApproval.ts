// client/src/api/courseApproval.ts
import apiClient from "./apiClient";

export interface PendingEnrollment {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    mobileNo: string;
  };
  course: {
    _id: string;
    title: string;
    price: number;
  };
  status: "pending" | "approved" | "rejected";
  paymentDetails: {
    payeeName: string;
    transactionId: string;
    amount: number;
    submittedAt: string;
  };
  enrolledAt: string;
  approvedAt?: string;
}

export interface CourseApprovalStats {
  totalPending: number;
  totalApproved: number;
  totalRejected: number;
  pendingEnrollments: PendingEnrollment[];
}

export const getPendingEnrollments = async (): Promise<PendingEnrollment[]> => {
  const res = await apiClient.get("/courses/enrollments/pending");
  return res.data;
};

export const approveCourseEnrollment = async (
  enrollmentId: string,
  reason?: string,
): Promise<{ message: string; enrollment: PendingEnrollment }> => {
  const res = await apiClient.post(
    `/courses/enrollments/${enrollmentId}/approve`,
    { reason },
  );
  return res.data;
};

export const rejectCourseEnrollment = async (
  enrollmentId: string,
  reason: string,
): Promise<{ message: string; enrollment: PendingEnrollment }> => {
  const res = await apiClient.post(
    `/courses/enrollments/${enrollmentId}/reject`,
    { reason },
  );
  return res.data;
};

export const getCourseApprovalStats =
  async (): Promise<CourseApprovalStats> => {
    const res = await apiClient.get("/courses/enrollments/stats");
    return res.data;
  };
