// controllers/course.controller.ts
import { Request, Response } from "express";
import { CourseService } from "../services/course.service";
import Course from "../models/course.modal";

// Public endpoints
export const getAllCourses = async (req: Request, res: Response) => {
  const courses = await CourseService.getAllCourses();
  // console.log("courses", courses);
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
  try{
    const { sectionId, courseId } = req.params;
    console.log("body", req.body)
    const { title, type, url} = req.body;
    const lesson = await CourseService.addLesson(courseId, sectionId, { title, type, url });
    res.status(201).json(lesson);
  }catch(error){
    res.status(500).json({ error: error.message || `Failed to add new lesson in course ${courseId} and section ${sectionId}` });
  }
  
};
