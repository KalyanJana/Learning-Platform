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
    price: number;
    discount?: number;
    bannerUrl?: string;
  }) {
    // Save course in database
    const course = await CourseRepository.createCourseInDb({
      title: body.title,
      description: body.description,
      price: body.price,
      discount: body.discount,
      bannerUrl: body.bannerUrl,
    });
    return course;
  },
  // async createCourse(
  //   body: { title: string; description?: string; price: number; discount?: number },
  //   file: Express.Multer.File
  // ) {
  //   console.log("service layer")
  //   const buffer = file.buffer;
  //   const filename = file.originalname.replace(/\.[^/.]+$/, "");
  //   console.log("file", file)
  //   // Determine resource type (image, video, raw)
  //   let resourceType: "image" | "video" | "raw" = "image";
  //   if (file.mimetype.startsWith("video")) resourceType = "video";
  //   else if (file.mimetype === "application/pdf") resourceType = "raw";

  //   // Call repo method
  //   console.log("resourseType", resourceType)
  //   const { public_id } = await uploadFileToCloudinaryRepo(buffer, filename, resourceType, "learningPlatform");
  //   console.log("bannerUrl", public_id);
  //   // Save course in database
  //   const course = await CourseRepository.createCourseInDb({
  //     title: body.title,
  //     description: body.description,
  //     price: body.price,
  //     discount: body.discount,
  //     bannerUrl: public_id,
  //   });
  //   return course;
  // }

  async addSection(courseId: string, sectionData: any) {
    const section = await SectionRepository.create({
      ...sectionData,
      course: courseId,
    });
    await SectionRepository.addToCourse(courseId, section._id);
    return section;
  },

  async getSectionsByCourseId(courseId: string) {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new Error("Invalid course ID");
    }
    const sections = await SectionRepository.findByCourseId(courseId);
    return sections;
  },

  async addLesson(courseId: string, sectionId: string, lessonData: any) {
    const lesson = await LessonRepository.create({
      ...lessonData,
      section: sectionId,
    });
    await LessonRepository.addToSection(sectionId, lesson._id);
    return lesson;
  },
};
