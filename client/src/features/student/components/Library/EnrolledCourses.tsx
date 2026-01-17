// src/features/student/components/Library/EnrolledCourses.tsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetUserEnrolledCourses } from "../../../../hooks/useCourseHooks";
import { useAuthStore } from "../../../../store/useAuthStore";

const EnrolledCourses = () => {
  const navigate = useNavigate();
  const { id: userId } = useAuthStore();

  const {
    data: enrolledCourses = [],
    isLoading,
    isError,
    error,
  } = useGetUserEnrolledCourses(userId || "");

  if (!userId) {
    return <Typography color="error">User not authenticated</Typography>;
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error">
        {(error as Error).message || "Failed to load enrolled courses"}
      </Typography>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          My Enrolled Courses
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", py: 4 }}>
          You haven't enrolled in any courses yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        My Enrolled Courses
      </Typography>

      <Grid container spacing={3}>
        {enrolledCourses.map((course: any) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="180"
                image={
                  course.thumbnail || "https://via.placeholder.com/300x200"
                }
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {course.description?.substring(0, 60)}...
                </Typography>
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{course.price}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    Sections: {course.sections?.length || 0}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/student/course/${course._id}`)}
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
