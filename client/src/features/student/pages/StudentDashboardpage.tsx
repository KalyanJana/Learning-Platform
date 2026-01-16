// src/features/student/pages/StudentDashboardPage.tsx
import React from 'react';
import { Box } from '@mui/material';
import StudentDashboard from '../components/StudentDashboard';

const StudentDashboardPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <StudentDashboard />
    </Box>
  );
};

export default StudentDashboardPage;
