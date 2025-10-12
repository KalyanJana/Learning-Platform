import { create } from "zustand";
import apiClient from "../utils/apiClient";

interface Section {
  _id: string;
  title: string;
}
interface Course {
  _id: string;
  title: string;
  sections: Section[];
}

interface CourseState {
  courses: Course[];
  loading: boolean;
  error?: string;
  fetchCourses: () => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  loading: false,
  error: undefined,

  fetchCourses: async () => {
    set({ loading: true, error: undefined });
    try {
      const response = await apiClient.get<Course[]>("/courses/v1");
      set({ courses: response.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch courses", loading: false });
    }
  },
}));
