// src/features/student/components/Library/CourseViewer/CourseViewerPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBack, MenuBook, Close } from "@mui/icons-material";
import VideoPlayer from "./VideoPlayer";
import PdfViewer from "./PdfViewer";
import ContentSidebar from "./ContentSidebar";
import type { Course, Lesson } from "../../../types/course.types";

const CourseViewerPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [course, setCourse] = useState<Course | null>(null);
  const [currentContent, setCurrentContent] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Mock data - Replace with React Query
  useEffect(() => {
    const mockCourse: Course = {
      id: courseId || "1",
      title: "React Mastery Course",
      description: "Complete React development course",
      thumbnail: "https://via.placeholder.com/300x200",
      instructor: "John Doe",
      price: "₹2,999",
      totalDuration: "10 hours",
      studentsEnrolled: 1500,
      sections: [
        {
          id: "s1",
          title: "Introduction to React",
          lessons: [
            {
              id: "c1",
              title: "What is React?",
              type: "video",
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              duration: 300,
              completed: false,
            },
            {
              id: "c2",
              title: "Course Introduction PDF",
              type: "pdf",
              url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
              completed: false,
            },
          ],
        },
        {
          id: "s2",
          title: "Components and Props",
          lessons: [
            {
              id: "c3",
              title: "Understanding Components",
              type: "video",
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              duration: 400,
              completed: false,
            },
          ],
        },
      ],
    };
    setCourse(mockCourse);
    setCurrentContent(mockCourse.sections[0].lessons[0]);
  }, [courseId]);

  const handleContentComplete = () => {
    if (!course || !currentContent) return;

    // Find next content
    let nextContent: Lesson | null = null;

    for (const section of course.sections) {
      const currentIndex = section.lessons.findIndex(
        (c) => c.id === currentContent.id
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
  if (!course || !currentContent) return <div>Loading...</div>;

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
