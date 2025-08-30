// src/pages/Dashboard/DashboardPage.tsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useAuthStore } from "../../store/authStore";
import CourseCard from "../../components/course/CourseCard";

interface Course {
  id: number;
  title: string;
  lessons: number;
  bannerUrl?: string;
  price?: string;
  isEnrolled?: boolean;
}

const GreetingSection: React.FC<{ userEmail?: string }> = ({ userEmail }) => (
  <Box
    sx={{
      bgcolor: "seagreen",
      color: "white",
      p: 4,
      borderRadius: 1,
      textAlign: "center",
      mb: 5,
    }}
  >
    <Typography variant="h4">Hi, {userEmail || "User"}!</Typography>
    <Typography variant="h6">Welcome to LearningX</Typography>
  </Box>
);

const CoursePage: React.FC = () => {
  const { user } = useAuthStore();

  // Mimic fetched API data for enrolled courses
  const enrolledCourses: Course[] = [
    {
      id: 1,
      title: "React Basics",
      lessons: 10,
      bannerUrl:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
      isEnrolled: true,
    },
    {
      id: 2,
      title: "TypeScript Mastery",
      lessons: 8,
      bannerUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      isEnrolled: true,
    },
  ];

  // Mimic fetched API data for available courses
  const availableCourses: Course[] = [
    {
      id: 3,
      title: "Node.js Fundamentals",
      lessons: 15,
      bannerUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      price: "$49.99",
    },
    {
      id: 4,
      title: "Advanced CSS Techniques",
      lessons: 12,
      bannerUrl:
        "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
      price: "$39.99",
    },
    {
      id: 5,
      title: "Fullstack Development",
      lessons: 25,
      bannerUrl:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      price: "$99.99",
    },
    {
      id: 6,
      title: "React Development",
      lessons: 25,
      bannerUrl:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      price: "$99.99",
    },
    {
      id: 5,
      title: "TypeScript Development",
      lessons: 25,
      bannerUrl:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
      price: "$99.99",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Greeting */}
      <GreetingSection userEmail={user?.username} />

      {/* Enrolled Courses List */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Your Enrolled Courses
        </Typography>
        {enrolledCourses.map((course) => (
          <Box key={course.id} sx={{ mb: 2 }}>
            <CourseCard {...course} />
          </Box>
        ))}
      </Box>

      {/* Available Courses List */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Courses Available
        </Typography>
        {availableCourses.map((course) => (
          <Box key={course.id} sx={{ mb: 2 }}>
            <CourseCard {...course} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CoursePage;
