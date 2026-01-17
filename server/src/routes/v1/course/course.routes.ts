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

// Course Approval Routes (Admin)
router.get("/enrollments/pending", courseController.getPendingEnrollments);
router.get("/enrollments/stats", courseController.getCourseApprovalStats);
router.post(
  "/enrollments/:enrollmentId/approve",
  courseController.approveCourseEnrollment,
);
router.post(
  "/enrollments/:enrollmentId/reject",
  courseController.rejectCourseEnrollment,
);

//Student
router.post("/:courseId/enroll", courseController.enrollCourse);
router.post(
  "/:courseId/payment",
  authenticateAccessToken,
  courseController.submitPaymentDetails,
);
router.get("/:userId/enrolledCourses", courseController.getUserEnrollCourses);
router.get("/:userId/pendingCourses", courseController.getUserPendingCourses);
router.get(
  "/:userId/otherAvailableCourses",
  courseController.getUserNotEnrolledCourses,
);
export default router;
