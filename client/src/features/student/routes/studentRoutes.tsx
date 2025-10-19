import React from 'react';
import { Route, Routes } from 'react-router-dom';

import StudentDashboardPage from '../pages/StudentDashboardPage';
import CourseProgressPage from '../pages/CourseProgressPage';

const StudentRoutes = () => (
  <Routes>
    <Route path="/" element={<StudentDashboardPage />} />
    <Route path="progress" element={<CourseProgressPage />} />
    {/* Add more student routes here */}
  </Routes>
);

export default StudentRoutes;
