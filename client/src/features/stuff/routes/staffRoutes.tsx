import React from "react";
import { Route, Routes } from "react-router-dom";

// import CourseProgressPage from "../pages/CourseProgressPage";
// import CourseViewerPage from "../components/Library/courseViewer/CourseVIewerPage";
// import PaymentPage from "../components/payment/PaymentPage";
import StaffDashboardPage from "../pages/StaffDashboardPage";

const StaffRoutes = () => (
  <Routes>
    <Route path="/" element={<StaffDashboardPage />} />
    {/* <Route path="/course/:courseId" element={<CourseViewerPage />} />
    <Route path="/payment/:courseId" element={<PaymentPage />} />
    <Route path="/progress" element={<CourseProgressPage />} /> */}
    {/* Add more student routes here */}
  </Routes>
);

export default StaffRoutes;
