// src/features/student/components/Library/CourseViewer/ContentSidebar.tsx
import React from "react";
import { Box, IconButton, Typography, Divider } from "@mui/material";
import { Close } from "@mui/icons-material";
import ContentAccordion from "./ContentAccordion";
import type { Course, Lesson } from "../../../types/course.types";

interface ContentSidebarProps {
  course: Course;
  currentContent: Lesson;
  onContentSelect: (content: Lesson) => void;
  onClose: () => void;
}

const ContentSidebar: React.FC<ContentSidebarProps> = ({
  course,
  currentContent,
  onContentSelect,
  onClose,
}) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 400 },
        height: "100vh",
        borderLeft: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        position: { xs: "fixed", sm: "relative" },
        right: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Course Content
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>
      <Divider />

      {/* Content List */}
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {course.sections.map((section) => (
          <ContentAccordion
            key={section.id}
            section={section}
            currentContentId={currentContent.id}
            onContentSelect={onContentSelect}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ContentSidebar;
