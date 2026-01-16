// src/features/student/components/Library/CourseViewer/PdfViewer.tsx
import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

interface PdfViewerProps {
  url: string;
  onComplete: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, onComplete }) => {
  useEffect(() => {
    // Auto-complete after 5 seconds (simulate reading time)
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [url, onComplete]);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <iframe
          src={url}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="PDF Viewer"
        />
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" mb={1}>
          PDF will auto-advance or click below
        </Typography>
        <Button variant="contained" endIcon={<NavigateNext />} onClick={onComplete}>
          Next Lesson
        </Button>
      </Box>
    </Box>
  );
};

export default PdfViewer;
