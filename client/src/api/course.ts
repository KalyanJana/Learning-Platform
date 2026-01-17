import apiClient from "../utils/apiClient";

export const fetchCoursesFn = async () => {
  const response = await apiClient.get("/courses");
  return response.data;
};

export const getCourseByIdFn = async (courseId: string) => {
  const response = await apiClient.get(`/courses/${courseId}`);
  return response.data;
};

export const createCourseFn = async (data: {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}) => {
  const response = await apiClient.post("/courses", data);
  return response.data;
};

export const createSectionFn = async (data: {
  courseId: string;
  title: string;
}) => {
  const response = await apiClient.post(`/courses/${data.courseId}/sections`, {
    courseId: data.courseId,
    title: data.title,
  });
  return response.data;
};

export const createLessonFn = async (data: {
  courseId: string;
  sectionId: string;
  title: string;
  type: string;
  url: string;
}) => {
  const response = await apiClient.post(
    `/courses/${data.courseId}/sections/${data.sectionId}/lessons`,
    {
      title: data.title,
      type: data.type,
      url: data.url,
    },
  );
  return response.data;
};
export const enrollCourseFn = async (courseId: string) => {
  const response = await apiClient.post(`/courses/${courseId}/enroll`, {});
  return response.data;
};

export const getUserEnrolledCoursesFn = async (userId: string) => {
  const response = await apiClient.get(`/courses/${userId}/enrolledCourses`);
  return response.data;
};

export const getUserNotEnrolledCoursesFn = async (userId: string) => {
  const response = await apiClient.get(
    `/courses/${userId}/otherAvailableCourses`,
  );
  return response.data;
};

export const submitPaymentFn = async (data: {
  courseId: string;
  payeeName: string;
  transactionId: string;
  amount: number;
}) => {
  const response = await apiClient.post(`/courses/${data.courseId}/payment`, {
    payeeName: data.payeeName,
    transactionId: data.transactionId,
    amount: data.amount,
  });
  return response.data;
};

export const getUserPendingCoursesFn = async (userId: string) => {
  const response = await apiClient.get(`/courses/${userId}/pendingCourses`);
  return response.data;
};
