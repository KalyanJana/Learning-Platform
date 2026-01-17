import React from "react";
import { Route, Routes } from "react-router-dom";

import StudentDashboardPage from "../pages/StudentDashboardPage";
import CourseProgressPage from "../pages/CourseProgressPage";
import CourseViewerPage from "../components/Library/courseViewer/CourseVIewerPage";
import PaymentPage from "../pages/PaymentPage";

const StudentRoutes = () => (
  <Routes>
    <Route path="/" element={<StudentDashboardPage />} />
    <Route path="/course/:courseId" element={<CourseViewerPage />} />
    <Route path="/payment/:courseId" element={<PaymentPage />} />
    <Route path="/progress" element={<CourseProgressPage />} />
    {/* Add more student routes here */}
  </Routes>
);

export default StudentRoutes;
