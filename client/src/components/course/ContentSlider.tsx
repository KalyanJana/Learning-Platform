import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface LessonItem {
  id: number;
  title: string;
  type: "video" | "pdf";
  url: string;
}

export interface Section {
  id: number;
  title: string;
  lessons: LessonItem[];
}

interface ContentSliderProps {
  sections: Section[];
  onSelectLesson: (lesson: LessonItem) => void;
  selectedLessonId?: number;
}

const ContentSlider: React.FC<ContentSliderProps> = ({
  sections,
  onSelectLesson,
  selectedLessonId,
}) => {
  console.log("sections", sections);
  const [expanded, setExpanded] = useState<number | false>(false);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!selectedLessonId && sections?.length > 0) {
      setExpanded(sections[0].id);
      if (sections[0].lessons.length > 0) {
        setSelectedId(sections[0].lessons[0].id);
        onSelectLesson(sections[0].lessons[0]);
      }
    }
  }, [selectedLessonId, sections, onSelectLesson]);

  const handleChange = (panelId: number) => () => {
    setExpanded(expanded === panelId ? false : panelId);
  };

  const handleClickLesson = (lesson: LessonItem) => {
    setSelectedId(lesson.id);
    onSelectLesson(lesson);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {sections?.map((section) => (
        <Accordion
          key={section.id}
          expanded={expanded === section.id}
          onChange={handleChange(section.id)}
          sx={{
            flex: "1 1 auto",
            width: "100%", // 🔑 Force full width of Grid column
            alignSelf: "stretch", // 🔑 Ensure it stretches inside flex
            mb: 0,
            "&:before": { display: "none" },
          }}
          square
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              width: "100%",
              "& .MuiAccordionSummary-content": {
                flexGrow: 1,
                width: "100%",
              },
            }}
          >
            <Typography fontWeight="bold">{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, width: "100%" }}>
            <List component="nav" disablePadding sx={{ width: "100%" }}>
              {section.lessons.map((lesson) => (
                <ListItemButton
                  key={lesson.id}
                  selected={lesson.id === (selectedLessonId ?? selectedId)}
                  onClick={() => handleClickLesson(lesson)}
                  sx={{ pl: 3, width: "100%" }}
                >
                  <ListItemText
                    primary={lesson.title}
                    secondary={lesson.type}
                  />
                </ListItemButton>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ContentSlider;
