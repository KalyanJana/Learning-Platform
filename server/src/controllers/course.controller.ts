// controllers/course.controller.ts
import { Request, Response } from "express";
import { CourseService } from "../services/course.service";
import Course from "../models/course.modal";

// Public endpoints
export const getAllCourses = async (req: Request, res: Response) => {
  const courses = await CourseService.getAllCourses();
  console.log("courses", courses)
  res.json(courses);
};

// controllers/course.controller.ts
export const getEnrolledCourses = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id; // Assumes you set req.user via auth middleware
    // Find courses where user is enrolled
    const courses = await Course.find({ enrolledUsers: userId }).populate(
      "sections"
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
export const createCourse = async (req: Request, res: Response) => {
  try {
    const result = await CourseService.createCourse(req.body);
    res.json(result);
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ error: error.message || "Upload failed" });
  }
};

export const addSection = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const section = await CourseService.addSection(courseId, req.body);
  res.status(201).json(section);
};

export const addLesson = async (req: Request, res: Response) => {
  const { sectionId, courseId } = req.params;
  // lessonData could include: title, url, type, description, order, uploadedBy ...
  // For file upload, req.file can be handled via multer and url passed in lessonData!
  const lesson = await CourseService.addLesson(courseId, sectionId, req.body);
  res.status(201).json(lesson);
};

// export const uploadVideoController = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });
//     const {title, description} = req.body;

//     const result = await uploadVideo(req.file.buffer, req.file.originalname.replace(/\.[^.]+$/, ""));
//     const hlsUrl = getHlsUrl(result.public_id);

//     // Save to DB if needed: { public_id, hlsUrl, ... }

//     res.json({
//       publicId: result.public_id,
//       hlsUrl,
//       message: "Video uploaded and ready for streaming",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message || "Upload failed" });
//   }
// };
