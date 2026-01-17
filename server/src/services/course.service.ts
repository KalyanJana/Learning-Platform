// services/courseService.ts
import {
  CourseRepository,
  SectionRepository,
  LessonRepository,
  uploadFileToCloudinaryRepo,
} from "../repositories/course.repositories";
import { Types } from "mongoose";

export const CourseService = {
  async getAllCourses() {
    return CourseRepository.findAllPopulated();
  },

  async getCourseById(courseId: string) {
    return CourseRepository.findByIdPopulated(courseId);
  },

  async createCourse(body: {
    title: string;
    description?: string;
    thumbnail?: string;
    price: number;
  }) {
    // Save course in database
    const course = await CourseRepository.createCourseInDb({
      title: body.title,
      description: body.description,
      thumbnail: body.thumbnail,
      price: body.price,
    });
    return course;
  },
   async addSection(courseId: string, sectionData: { title: string }) {
    console.log("Adding section to course:", courseId);
    const section = await SectionRepository.create({
      ...sectionData,
      course: courseId,
    });
    console.log("Created section:", section);
    // Add section to course's sections array
    await CourseRepository.addSectionToCourse(courseId, section._id);
    console.log("Added section to course:", courseId);
    return section;
  }

  async getSectionsByCourseId(courseId: string) {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new Error("Invalid course ID");
    }
    const sections = await SectionRepository.findByCourseId(courseId);
    return sections;
  },

  async addLesson(courseId: string, sectionId: string, lessonData: { title: string, type: string, url: string }) {
    console.log("Adding lesson to course:", courseId, "section:", sectionId);
    const lesson = await LessonRepository.create({
      ...lessonData,
      section: sectionId,
    });
    console.log("Created lesson:", lesson);
    await LessonRepository.addLessonToSection(sectionId, lesson._id);
    console.log("Added lesson to section:", sectionId);
    return lesson;
  },
};
