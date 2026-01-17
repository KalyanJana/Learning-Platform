import apiClient from "../utils/apiClient";

export const fetchCoursesFn = async () => {
  const response = await apiClient.get("/courses/v1");
  return response.data;
};

export const createCourseFn = async (data: {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}) => {
  const response = await apiClient.post("/courses/v1", data);
  return response.data;
};

export const createSectionFn = async (data: {
  courseId: string;
  title: string;
}) => {
  const response = await apiClient.post(
    `/courses/v1/${data.courseId}/sections`,
    { courseId: data.courseId, title: data.title }
  );
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
    `/courses/v1/${data.courseId}/sections/${data.sectionId}/lessons`,
    {
      title: data.title,
      type: data.type,
      url: data.url,
    }
  );
  return response.data;
};
