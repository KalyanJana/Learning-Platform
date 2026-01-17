// controllers/course.controller.ts
import { Request, Response } from "express";
import { CourseService } from "../services/course.service";
import Course from "../models/course.modal";

// Public endpoints

// controllers/course.controller.ts
export const getEnrolledCourses = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id; // Assumes you set req.user via auth middleware
    // Find courses where user is enrolled
    const courses = await Course.find({ enrolledUsers: userId }).populate(
      "sections",
    );
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Error fetching enrolled courses." });
  }
};

export const getAvailableCourses = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    // Find courses where user is NOT enrolled
    const courses = await Course.find({
      enrolledUsers: { $ne: userId },
    }).populate("sections");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Error fetching available courses." });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const course = await CourseService.getCourseById(courseId);
  res.json(course);
};

export const getSectionsByCourseId = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const sections = await CourseService.getSectionsByCourseId(courseId);
  res.json(sections);
};

// Admin endpoints
export const getAllCourses = async (req: Request, res: Response) => {
  const courses = await CourseService.getAllCourses();
  // console.log("courses", courses);
  res.json(courses);
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const result = await CourseService.createCourse(req.body);
    res.json(result);
  } catch (error: any) {
    // console.error("Cloudinary upload error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to create new course" });
  }
};

export const addSection = async (req: Request, res: Response) => {
  try {
    const { courseId, title } = req.body;
    const section = await CourseService.addSection(courseId, { title });
    res.status(201).json({
      success: true,
      data: section,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || `Failed to add new section`,
    });
  }
};

export const addLesson = async (req: Request, res: Response) => {
  try {
    const { sectionId, courseId } = req.params;
    console.log("body", req.body);
    const { title, type, url } = req.body;
    const lesson = await CourseService.addLesson(courseId, sectionId, {
      title,
      type,
      url,
    });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({
      error:
        error.message ||
        `Failed to add new lesson in course ${courseId} and section ${sectionId}`,
    });
  }
};

export const submitPaymentDetails = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;
    const { payeeName, transactionId, amount } = req.body;

    if (!payeeName || !transactionId || !amount) {
      return res.status(400).json({
        error: "payeeName, transactionId, and amount are required",
      });
    }

    const enrollment = await CourseService.submitPaymentDetails(
      courseId,
      userId,
      {
        payeeName,
        transactionId,
        amount: Number(amount),
      },
    );

    res.status(201).json({
      success: true,
      message:
        "Payment details submitted successfully. Please wait for admin approval within 24 hours.",
      data: enrollment,
    });
  } catch (error: any) {
    res.status(500).json({
      error:
        error.message ||
        `Failed to submit payment for course ${req.params.courseId}`,
    });
  }
};

export const getUserPendingCourses = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const enrollments = await CourseService.getUserPendingCourses(userId);
    res.json(enrollments);
  } catch (error: any) {
    res.status(500).json({
      error:
        error.message ||
        `Failed to fetch pending enrollments for user ${req.params.userId}`,
    });
  }
};

export const enrollCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;
    const course = await CourseService.enrollCourse(courseId, userId);
  } catch (error) {
    res.status(500).json({
      error: error.message || `Failed to enroll in course ${courseId}`,
    });
  }
};

export const getUserEnrollCourses = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const courses = await CourseService.getUserEnrolledCourses(userId);
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({
      error:
        error.message ||
        `Failed to fetch enrolled courses for user ${req.params.userId}`,
    });
  }
};

export const getUserNotEnrolledCourses = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;
    const courses = await CourseService.getUserNotEnrolledCourses(userId);
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({
      error:
        error.message ||
        `Failed to fetch available courses for user ${req.params.userId}`,
    });
  }
};

// Course Approval Endpoints (Admin)
export const getPendingEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await CourseService.getPendingEnrollments();
    res.json(enrollments);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Failed to fetch pending enrollments",
    });
  }
};

export const approveCourseEnrollment = async (req: Request, res: Response) => {
  try {
    const { enrollmentId } = req.params;
    const { reason } = req.body;
    const enrollment = await CourseService.approveCourseEnrollment(
      enrollmentId,
      reason || "Approved by admin",
    );
    res.json({
      success: true,
      message: "Course enrollment approved successfully",
      data: enrollment,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Failed to approve enrollment",
    });
  }
};

export const rejectCourseEnrollment = async (req: Request, res: Response) => {
  try {
    const { enrollmentId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        error: "Rejection reason is required",
      });
    }

    const enrollment = await CourseService.rejectCourseEnrollment(
      enrollmentId,
      reason,
    );
    res.json({
      success: true,
      message: "Course enrollment rejected successfully",
      data: enrollment,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Failed to reject enrollment",
    });
  }
};

export const getCourseApprovalStats = async (req: Request, res: Response) => {
  try {
    const stats = await CourseService.getCourseApprovalStats();
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Failed to fetch approval statistics",
    });
  }
};
