// src/features/student/components/Library/CourseViewer/VideoPlayer.tsx
import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';

interface VideoPlayerProps {
  url: string;
  onComplete: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setTimeout(() => {
        onComplete();
      }, 1000); // 1 second delay before auto-playing next
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [onComplete]);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        src={url}
      >
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default VideoPlayer;
