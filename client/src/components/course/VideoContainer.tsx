// src/components/VideoContainer.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface VideoContainerProps {
  lesson: { type: "video" | "pdf"; url: string } | null;
}

const VideoContainer: React.FC<VideoContainerProps> = ({ lesson }) => {
  if (!lesson) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Select a lesson to preview</Typography>
      </Box>
    );
  }

  if (lesson.type === "video") {
    return (
      <Box sx={{ width: "100%", height: 400 }}>
        <video
          width="100%"
          height="100%"
          controls
          src={lesson.url}
          style={{ borderRadius: 8 }}
        />
      </Box>
    );
  }

  if (lesson.type === "pdf") {
    return (
      <Box sx={{ width: "100%", height: 400 }}>
        <iframe
          src={lesson.url}
          width="100%"
          height="100%"
          title="PDF Viewer"
          style={{ borderRadius: 8, border: "none" }}
        />
      </Box>
    );
  }

  return null;
};

export default VideoContainer;
