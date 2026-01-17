// src/features/student/components/Library/OtherCourses.tsx
import React, { useMemo } from "react";
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
import {
  useGetUserNotEnrolledCourses,
  useGetUserPendingCourses,
} from "../../../../hooks/useCourseHooks";
import { useAuthStore } from "../../../../store/useAuthStore";

const OtherCourses = () => {
  const navigate = useNavigate();
  const { id: userId } = useAuthStore();

  const {
    data: otherCourses = [],
    isLoading,
    isError,
    error,
  } = useGetUserNotEnrolledCourses(userId || "");

  const { data: pendingCourses = [], isLoading: pendingLoading } =
    useGetUserPendingCourses(userId || "");

  // Create a set of pending course IDs for quick lookup
  const pendingCourseIds = useMemo(
    () => new Set(pendingCourses.map((c: any) => c.course?._id || c._id)),
    [pendingCourses],
  );

  if (!userId) {
    return <Typography color="error">User not authenticated</Typography>;
  }

  if (isLoading || pendingLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error">
        {(error as Error).message || "Failed to load available courses"}
      </Typography>
    );
  }

  if (otherCourses.length === 0) {
    return (
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Explore Other Courses
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", py: 4 }}>
          You are enrolled in all available courses.
        </Typography>
      </Box>
    );
  }

  const handleEnrollClick = (courseId: string) => {
    navigate(`/student/payment/${courseId}`);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Explore Other Courses
      </Typography>

      <Grid container spacing={3}>
        {otherCourses.map((course: any) => {
          const isPending = pendingCourseIds.has(course._id);

          return (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
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
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {course.description?.substring(0, 60)}...
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Sections: {course.sections?.length || 0}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6" color="primary">
                      ₹{course.price}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleEnrollClick(course._id)}
                    disabled={isPending}
                    color={isPending ? "inherit" : "primary"}
                  >
                    {isPending ? "Enrollment Pending" : "Enroll Now"}
                  </Button>
                  {isPending && (
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: "block", mt: 1, textAlign: "center" }}
                    >
                      Waiting for admin approval...
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default OtherCourses;
