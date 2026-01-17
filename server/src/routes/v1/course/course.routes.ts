// routes/courseRoutes.ts
import express from "express";
import * as courseController from "../../../controllers/course.controller";
import { authenticateAccessToken } from "../../../middlewares/auth.middleware";

const router = express.Router();

// Public
router.get("/:courseId", courseController.getCourseById);
router.get(":courseId/sections", courseController.getSectionsByCourseId);
router.get(
  "/enrolled",
  authenticateAccessToken,
  courseController.getEnrolledCourses,
);
router.get(
  "/available",
  authenticateAccessToken,
  courseController.getAvailableCourses,
);

// Admin
router.get("/", courseController.getAllCourses);
router.post("/", courseController.createCourse);
router.post("/:courseId/sections", courseController.addSection);
router.post(
  "/:courseId/sections/:sectionId/lessons",
  courseController.addLesson,
);

//Student

export default router;
