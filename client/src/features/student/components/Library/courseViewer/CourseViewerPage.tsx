// src/features/student/components/Library/CourseViewer/CourseViewerPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ArrowBack, MenuBook } from "@mui/icons-material";
import VideoPlayer from "./VideoPlayer";
import PdfViewer from "./PdfViewer";
import ContentSidebar from "./ContentSidebar";
import { useGetCourseById } from "../../../../../hooks/useCourseHooks";
import type { Course, Lesson } from "../../../types/course.types";

const CourseViewerPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    data: fetchedCourse,
    isLoading,
    error,
  } = useGetCourseById(courseId || "");
  const [course, setCourse] = useState<Course | null>(null);
  const [currentContent, setCurrentContent] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Transform fetched course data to match Course interface
  useEffect(() => {
    if (fetchedCourse) {
      const transformedCourse: Course = {
        id: fetchedCourse._id,
        title: fetchedCourse.title,
        description: fetchedCourse.description || "",
        thumbnail:
          fetchedCourse.thumbnail || "https://via.placeholder.com/300x200",
        instructor: fetchedCourse.instructor || "Unknown",
        price: `₹${fetchedCourse.price}`,
        totalDuration: "N/A",
        studentsEnrolled: 0,
        sections: (fetchedCourse.sections || []).map((section: any) => ({
          id: section._id,
          title: section.title,
          lessons: (section.lessons || []).map((lesson: any) => ({
            id: lesson._id,
            title: lesson.title,
            type: lesson.type === "video" ? "video" : "pdf",
            url: lesson.url,
            duration: lesson.duration,
            completed: false,
          })),
        })),
      };
      setCourse(transformedCourse);

      // Set first lesson as default
      if (
        transformedCourse.sections.length > 0 &&
        transformedCourse.sections[0].lessons.length > 0
      ) {
        setCurrentContent(transformedCourse.sections[0].lessons[0]);
      }
    }
  }, [fetchedCourse]);

  const handleContentComplete = () => {
    if (!course || !currentContent) return;

    // Find next content
    let nextContent: Lesson | null = null;

    for (const section of course.sections) {
      const currentIndex = section.lessons.findIndex(
        (c) => c.id === currentContent.id,
      );
      if (currentIndex !== -1) {
        // Check if there's next content in same section
        if (currentIndex < section.lessons.length - 1) {
          nextContent = section.lessons[currentIndex + 1];
        } else {
          // Move to next section
          const nextSectionIndex =
            course.sections.findIndex((s) => s.id === section.id) + 1;
          if (nextSectionIndex < course.sections.length) {
            nextContent = course.sections[nextSectionIndex].lessons[0];
          }
        }
        break;
      }
    }

    if (nextContent) {
      setCurrentContent(nextContent);
    }
  };

  const handleContentSelect = (content: Lesson) => {
    setCurrentContent(content);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error || !course || !currentContent) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton onClick={() => navigate("/student")}>
            <ArrowBack />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>Course View</Box>
        </Box>
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Alert severity="error">
            {error instanceof Error
              ? error.message
              : "Failed to load course content. Please try again."}
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton onClick={() => navigate("/student")}>
            <ArrowBack />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <strong>{course.title}</strong>
          </Box>
          {!sidebarOpen && (
            <Button
              variant="outlined"
              startIcon={<MenuBook />}
              onClick={() => setSidebarOpen(true)}
            >
              View Content
            </Button>
          )}
        </Box>

        {/* Video/PDF Player */}
        <Box sx={{ flexGrow: 1, bgcolor: "black", position: "relative" }}>
          {currentContent.type === "video" ? (
            <VideoPlayer
              url={currentContent.url}
              onComplete={handleContentComplete}
            />
          ) : (
            <PdfViewer
              url={currentContent.url}
              onComplete={handleContentComplete}
            />
          )}
        </Box>
      </Box>

      {/* Content Sidebar */}
      {sidebarOpen && (
        <ContentSidebar
          course={course}
          currentContent={currentContent}
          onContentSelect={handleContentSelect}
          onClose={() => setSidebarOpen(false)}
        />
      )}
    </Box>
  );
};

export default CourseViewerPage;
