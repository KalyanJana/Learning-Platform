// src/pages/CoursePage.tsx
import React, { useState } from "react";
import { Container, Grid, useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import ContentSlider from "../../components/course/ContentSlider";
import VideoContainer from "../../components/course/VideoContainer";
import ContentTabs from "../../components/course/ContentTabs";


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

const dummySections: Section[] = [
  {
    id: 1,
    title: "Introduction",
    lessons: [
      { id: 101, title: "Welcome", type: "video", url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
      { id: 102, title: "Setup PDF", type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    ],
  },
  {
    id: 2,
    title: "Advanced Topics",
    lessons: [
      { id: 201, title: "Deep Dive Video", type: "video", url: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4" },
      { id: 202, title: "Best Practices PDF", type: "pdf", url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf" },
    ],
  },
  {
    id: 3,
    title: "Expert Insights",
    lessons: [
      { id: 301, title: "Interview with an Expert", type: "video", url: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4" },
      { id: 302, title: "Case Study PDF", type: "pdf", url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf" },
    ],
  },
  {
    id: 4,
    title: "Conclusion",
    lessons: [
      { id: 401, title: "Wrapping Up Video", type: "video", url: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4" },
      { id: 402, title: "Final Thoughts PDF", type: "pdf", url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf" },
    ],
  }
];

const CourseDetails: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const aboutText = "Node.js course covering basics to advanced.";
  const discussionContent = <div>Discussion forum coming soon...</div>;
  const recentVideos = <div>Recent videos here.</div>;
  const bookmarkContent = <div>No bookmarks yet.</div>;
  const certificateContent = <div>Certificates appear here when available.</div>;

  const courseContentTab = isMobile ? (
    <ContentSlider
      sections={dummySections}
      selectedLessonId={selectedLesson?.id}
      onSelectLesson={setSelectedLesson}
    />
  ) : null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <VideoContainer lesson={selectedLesson} />
          <ContentTabs
            courseContent={courseContentTab}
            aboutText={aboutText}
            discussionContent={discussionContent}
            recentVideos={recentVideos}
            bookmarkContent={bookmarkContent}
            certificateContent={certificateContent}
          />
        </Grid>
        {!isMobile && (
          <Grid item xs={12} md={4}>
            <ContentSlider
              sections={dummySections}
              selectedLessonId={selectedLesson?.id}
              onSelectLesson={setSelectedLesson}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CourseDetails;
