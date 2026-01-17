import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchCoursesFn,
  getCourseByIdFn,
  createCourseFn,
  createSectionFn,
  createLessonFn,
  enrollCourseFn,
  getUserEnrolledCoursesFn,
  getUserNotEnrolledCoursesFn,
  submitPaymentFn,
  getUserPendingCoursesFn,
} from "../api/course";

export const useFetchCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCoursesFn,
  });
};

export const useGetCourseById = (courseId: string) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseByIdFn(courseId),
    enabled: !!courseId,
  });
};

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: createCourseFn,
  });
};

export const useCreateSection = () => {
  return useMutation({
    mutationFn: createSectionFn,
  });
};

export const useCreateLesson = () => {
  return useMutation({
    mutationFn: createLessonFn,
  });
};

export const useEnrollCourse = () => {
  return useMutation({
    mutationFn: enrollCourseFn,
  });
};

export const useGetUserEnrolledCourses = (userId: string) => {
  return useQuery({
    queryKey: ["userEnrolledCourses", userId],
    queryFn: () => getUserEnrolledCoursesFn(userId),
    enabled: !!userId,
  });
};

export const useGetUserNotEnrolledCourses = (userId: string) => {
  return useQuery({
    queryKey: ["userNotEnrolledCourses", userId],
    queryFn: () => getUserNotEnrolledCoursesFn(userId),
    enabled: !!userId,
  });
};

export const useSubmitPayment = () => {
  return useMutation({
    mutationFn: submitPaymentFn,
  });
};

export const useGetUserPendingCourses = (userId: string) => {
  return useQuery({
    queryKey: ["userPendingCourses", userId],
    queryFn: () => getUserPendingCoursesFn(userId),
    enabled: !!userId,
  });
};
