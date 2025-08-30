// src/components/ContentTabs.tsx
import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

interface ContentTabsProps {
  courseContent?: React.ReactNode; // optional first tab content
  aboutText: string;
  discussionContent: React.ReactNode;
  recentVideos: React.ReactNode;
  bookmarkContent: React.ReactNode;
  certificateContent: React.ReactNode;
}

const ContentTabs: React.FC<ContentTabsProps> = ({
  courseContent,
  aboutText,
  discussionContent,
  recentVideos,
  bookmarkContent,
  certificateContent,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [];
  if (courseContent) tabs.push("Course Content");
  tabs.push("About", "Discussion", "Recent Video", "Bookmark", "Certificate");

  const contentMap = [];
  if (courseContent) contentMap.push(courseContent);
  contentMap.push(
    <Typography sx={{ p: 2 }}>{aboutText}</Typography>,
    <Box sx={{ p: 2 }}>{discussionContent}</Box>,
    <Box sx={{ p: 2 }}>{recentVideos}</Box>,
    <Box sx={{ p: 2 }}>{bookmarkContent}</Box>,
    <Box sx={{ p: 2 }}>{certificateContent}</Box>
  );

  const handleChange = (_: React.SyntheticEvent, newVal: number) => setTabIndex(newVal);

  return (
    <Paper sx={{ mt: 3 }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      <Divider />
      <Box sx={{ minHeight: 150 }}>{contentMap[tabIndex]}</Box>
    </Paper>
  );
};

export default ContentTabs;
