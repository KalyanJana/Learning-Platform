// src/features/student/components/Library/EnrolledCourses.tsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  LinearProgress,
  Button,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
  // Mock data - replace with React Query hook
  const enrolledCourses = [
    {
      id: 1,
      title: "React Mastery Course",
      progress: 65,
      thumbnail: "https://via.placeholder.com/300x200",
      instructor: "John Doe",
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      progress: 40,
      thumbnail: "https://via.placeholder.com/300x200",
      instructor: "Jane Smith",
    },
  ];
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        My Enrolled Courses
      </Typography>

      <Grid container spacing={3}>
        {enrolledCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="180"
                image={course.thumbnail}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Instructor: {course.instructor}
                </Typography>
                <Box mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Progress: {course.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={course.progress}
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Chip label="Continue Learning" color="primary" size="small" />
                <Button
                  variant="contained"
                  onClick={() => navigate(`/student/course/${course.id}`)}
                >
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EnrolledCourses;
