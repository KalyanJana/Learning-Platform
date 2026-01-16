// src/pages/Dashboard/DashboardPage.tsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useAuthStore } from "../../store/useAuthStore";
import CourseCard from "../../components/course/CourseCard";
import { useCourseStore } from "../../store/useCourseStore";

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
  const { courses, fetchCourses } = useCourseStore();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // async function fetchRequiredCourses() {
    //   try {
    //     // Option 1: Two endpoints
    //     const [enrolledRes, availableRes] = await Promise.all([
    //       apiClient.get("/courses/v1/enrolled"),
    //       apiClient.get("/courses/v1/available"),
    //     ]);
    //     console.log("enrolled", enrolledRes);
    //     console.log("available", availableRes);
    //     setEnrolledCourses(enrolledRes.data);
    //     setAvailableCourses(availableRes.data);
    //   } catch (e) {
    //     // Handle error
    //   }
    //   setLoading(false);
    // }
    // fetchRequiredCourses();
    fetchCourses();
  }, []);

  console.log("courses", courses);

  // // Mimic fetched API data for enrolled courses
  // const enrolledCourses: Course[] = [
  //   {
  //     _id: 1,
  //     title: "React Basics",
  //     lessons: 10,
  //     bannerUrl:
  //       "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
  //     isEnrolled: true,
  //   },
  //   {
  //     _id: 2,
  //     title: "TypeScript Mastery",
  //     lessons: 8,
  //     bannerUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
  //     isEnrolled: true,
  //   },
  // ];

  // // Mimic fetched API data for available courses
  // const availableCourses: Course[] = [
  //   {
  //     _id: 3,
  //     title: "Node.js Fundamentals",
  //     lessons: 15,
  //     bannerUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  //     isEnrolled: false,
  //     price: "$49.99",
  //   },
  //   {
  //     _id: 4,
  //     title: "Advanced CSS Techniques",
  //     lessons: 12,
  //     bannerUrl:
  //       "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
  //       isEnrolled: false,
  //     price: "$39.99",
  //   },
  //   {
  //     _id: 5,
  //     title: "Fullstack Development",
  //     lessons: 25,
  //     bannerUrl:
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  //       isEnrolled: false,
  //     price: "$99.99",
  //   },
  //   {
  //     _id: 6,
  //     title: "React Development",
  //     lessons: 25,
  //     bannerUrl:
  //       "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  //       isEnrolled: false,
  //     price: "$99.99",
  //   },
  //   {
  //     _id: 5,
  //     title: "TypeScript Development",
  //     lessons: 25,
  //     bannerUrl:
  //       "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
  //       isEnrolled: false,
  //     price: "$99.99",
  //   },
  // ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Greeting */}
      <GreetingSection userEmail={user?.username} />

      {/* Enrolled Courses List */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Your Enrolled Courses
        </Typography>
        {enrolledCourses?.map((course) => (
          <Box key={course._id} sx={{ mb: 2 }}>
            <CourseCard {...course} />
          </Box>
        ))}
      </Box>

      {/* Available Courses List */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Courses Available
        </Typography>
        {availableCourses?.map((course) => (
          <Box key={course._id} sx={{ mb: 2 }}>
            <CourseCard {...course} />
          </Box>
        ))}
      </Box>

      {/* All courses list  */}
      <Box>
        <Typography variant="h5" gutterBottom>
          All courses
        </Typography>
        {courses?.map((course) => (
          <Box key={course._id} sx={{ mb: 2 }}>
            <CourseCard {...course} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CoursePage;
