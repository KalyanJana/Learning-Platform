import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCoursesFn, createCourseFn, createSectionFn, createLessonFn } from "../api/course";

export const useFetchCourses = () => {

    return useQuery({
        queryKey: ["courses"],
        queryFn: fetchCoursesFn,
    })
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

