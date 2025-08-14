import api from "./apiClient";

export interface CourseCardDTO {
  _id: string;
  title: string;
  bannerImage: string;
  description: string;
  offerDetails?: string;
  price: number;
  numVideos: number;
  purchased?: boolean;
}

export const getAllCourses = async () => {
  const { data } = await api.get("/courses");
  return data as CourseCardDTO[];
};

export const getMyCourses = async () => {
  const { data } = await api.get("/courses/my");
  return data as CourseCardDTO[];
};

export const getCourseById = async (id: string) => {
  const { data } = await api.get(`/courses/${id}`);
  return data as any; // shape: { sections: [...], ... }
};