// src/features/student/components/Library/OtherCourses.tsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Chip,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const OtherCourses = () => {
  // Mock data - replace with React Query hook
  const otherCourses = [
    {
      id: 3,
      title: "Python for Data Science",
      price: "₹2,999",
      thumbnail: "https://via.placeholder.com/300x200",
      instructor: "Dr. Sarah Johnson",
      rating: 4.8,
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      price: "₹3,499",
      thumbnail: "https://via.placeholder.com/300x200",
      instructor: "Prof. Mike Wilson",
      rating: 4.9,
    },
  ];
const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Explore Other Courses
      </Typography>

      <Grid container spacing={3}>
        {otherCourses.map((course) => (
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
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Instructor: {course.instructor}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Chip
                    label={`Rating: ${course.rating}`}
                    size="small"
                    color="success"
                  />
                  <Typography variant="h6" color="primary">
                    {course.price}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/student/payment/${course.id}`)}
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OtherCourses;
