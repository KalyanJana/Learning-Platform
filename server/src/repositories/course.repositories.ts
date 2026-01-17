import Course from "../models/course.modal";
import Section from "../models/section.modal";
import Lesson from "../models/lesson.modal";
import EnrollmentCourse from "../models/enrollment.modal";
import { Types } from "mongoose";
import cloudinary from "../config/cloudinary";

interface CloudinaryUploadVideoResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: any;
}

interface CloudinaryUploadFileResult {
  public_id: string;
  [key: string]: any;
}

// Standalone function for file upload
export async function uploadCourseBanner(fileBuffer: Buffer, filename: string) {
  console.log({
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME
      ? process.env.CLOUDINARY_CLOUD_NAME
      : "missing",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY
      ? process.env.CLOUDINARY_API_KEY
      : "missing",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
      ? process.env.CLOUDINARY_API_SECRET
      : "missing",
  });

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          public_id: filename,
          folder: "learningPlatform",
          upload_preset: "learning_platform", // Only if you want to use custom preset
          overwrite: true,
        },
        (err, result) => {
          if (err) {
            console.error("Upload error:", err);
            return reject(err);
          }
          console.log("Upload result:", result);
          resolve(result);
        },
      )
      .end(fileBuffer);
  });
}

export const CourseRepository = {
  async create(data: any) {
    return await Course.create(data);
  },

  async createCourseInDb(data: {
    title: string;
    description?: string;
    thumbnail: string;
    price: number;
  }) {
    console.log("repository layer");
    const course = new Course(data);
    return await course.save();
  },

  async addSectionToCourse(courseId: string, sectionId: Types.ObjectId) {
    return Course.findByIdAndUpdate(
      courseId,
      { $push: { sections: sectionId } },
      { new: true },
    );
  },

  async findByIdPopulated(courseId: string) {
    return Course.findById(courseId).populate({
      path: "sections",
      populate: { path: "lessons" },
    });
  },

  async findAllPopulated() {
    return Course.find().populate({
      path: "sections",
      populate: { path: "lessons" },
    });
  },
};

export const SectionRepository = {
  async create(data: any) {
    return await Section.create(data);
  },

  async findByCourseId(courseId: string) {
    return Section.find({ course: courseId });
  },
};

export const LessonRepository = {
  async create(data: any) {
    return await Lesson.create(data);
  },

  async addLessonToSection(sectionId: string, lessonId: Types.ObjectId) {
    return Section.findByIdAndUpdate(
      sectionId,
      { $push: { lessons: lessonId } },
      { new: true },
    );
  },
};

export const EnrollRepository = {
  async enrollCourse(courseId: string, userId: string) {
    const enrollment = new EnrollmentCourse({
      course: courseId,
      user: userId,
      status: "pending",
    });
    return await enrollment.save();
  },

  async submitPaymentDetails(
    courseId: string,
    userId: string,
    paymentData: {
      payeeName: string;
      transactionId: string;
      amount: number;
    },
  ) {
    const enrollment = await EnrollmentCourse.findOneAndUpdate(
      { course: courseId, user: userId },
      {
        paymentDetails: {
          payeeName: paymentData.payeeName,
          transactionId: paymentData.transactionId,
          amount: paymentData.amount,
          submittedAt: new Date(),
        },
        status: "pending",
      },
      { new: true, upsert: true },
    );
    return enrollment;
  },

  async getUserEnrolledCourses(userId: string) {
    const enrollments = await EnrollmentCourse.find({
      user: userId,
      status: "approved",
    }).populate({
      path: "course",
      populate: {
        path: "sections",
        populate: { path: "lessons" },
      },
    });
    return enrollments.map((enrollment) => enrollment.course);
  },

  async getUserPendingCourses(userId: string) {
    const enrollments = await EnrollmentCourse.find({
      user: userId,
      status: "pending",
    }).populate("course");
    return enrollments;
  },

  async getUserNotEnrolledCourses(userId: string) {
    const enrollments = await EnrollmentCourse.find({
      user: userId,
      status: { $in: ["approved", "pending"] },
    }).select("course");
    const enrolledCourseIds = enrollments.map(
      (enrollment) => enrollment.course,
    );

    const availableCourses = await Course.find({
      _id: { $nin: enrolledCourseIds },
    }).populate({
      path: "sections",
      populate: { path: "lessons" },
    });

    return availableCourses;
  },
};
