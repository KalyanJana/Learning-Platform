// src/features/student/components/Library/CourseViewer/ContentAccordion.tsx
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
} from "@mui/material";
import {
  ExpandMore,
  PlayCircle,
  PictureAsPdf,
  CheckCircle,
} from "@mui/icons-material";
import type { CourseSection, Lesson } from "../../../types/course.types";

interface ContentAccordionProps {
  section: CourseSection;
  currentContentId: string;
  onContentSelect: (content: Lesson) => void;
}

const ContentAccordion: React.FC<ContentAccordionProps> = ({
  section,
  currentContentId,
  onContentSelect,
}) => {
  return (
    <Accordion defaultExpanded sx={{ mb: 1 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <strong>{section.title}</strong>
          <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
            <Chip label={`${section.lessons.length} lessons`} size="small" />
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <List dense>
          {section.lessons.map((lesson) => (
            <ListItem
              key={lesson.id}
              disablePadding
              sx={{
                bgcolor:
                  currentContentId === lesson.id
                    ? "action.selected"
                    : "transparent",
              }}
            >
              <ListItemButton onClick={() => onContentSelect(lesson)}>
                <ListItemIcon>
                  {lesson.type === "video" ? (
                    <PlayCircle
                      color={
                        currentContentId === lesson.id ? "primary" : "action"
                      }
                    />
                  ) : (
                    <PictureAsPdf
                      color={
                        currentContentId === lesson.id ? "primary" : "action"
                      }
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={lesson.title}
                  secondary={
                    lesson.type === "video" && lesson.duration
                      ? `${Math.floor(lesson.duration / 60)}:${(
                          lesson.duration % 60
                        )
                          .toString()
                          .padStart(2, "0")}`
                      : "PDF Document"
                  }
                />
                {lesson.completed && (
                  <CheckCircle color="success" fontSize="small" />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default ContentAccordion;
