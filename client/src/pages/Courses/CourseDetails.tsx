// src/pages/CoursePage.tsx
import React, { useState } from "react";
import { Container, Grid, useMediaQuery, Box } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import ContentSlider from "../../components/course/ContentSlider";
import VideoContainer from "../../components/course/VideoContainer";
import ContentTabs from "../../components/course/ContentTabs";
import PricingSectionCard from "../../components/course/PricingSelectionCard";

export interface Course {
  _id: string;
  title: string;
  sections: Section[];
  bannerUrl: string;
  isEnrolled: boolean;
  price: string;
}

export interface Section {
  _id: number;
  title: string;
  description: string;
  duration: string;
  lessons: LessonItem[];
}

export interface LessonItem {
  _id: string;
  title: string;
  type: "video" | "pdf";
  url: string;
}

const course: Course[] = {
  _id: 1,
  title: "Introduction",
  sections: [
    {
      _id: 1,
      title: "Introduction to Node.js",
      description: "Learn the basics of Node.js",
      duration: "2 hours",
      lessons: [
        {
          _id: 101,
          title: "Welcome",
          type: "video",
          url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
        },
        {
          _id: 102,
          title: "Setup PDF",
          type: "pdf",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
      ],
    },
    {
      _id: 2,
      title: "Advanced Topics",
      description: "Dive deeper into Node.js",
      duration: "3 hours",
      lessons: [
        {
          _id: 201,
          title: "Asynchronous Programming",
          type: "video",
          url: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
        },
        {
          _id: 202,
          title: "Error Handling PDF",
          type: "pdf",
          url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
        },
      ],
    },
    {
      _id: 3,
      title: "Expert Insights",
      description: "Gain insights from industry experts",
      duration: "4 hours",
      lessons: [
        {
          _id: 301,
          title: "Interview with an Expert",
          type: "video",
          url: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
        },
        {
          _id: 302,
          title: "Case Study PDF",
          type: "pdf",
          url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
        },
      ],
    },
    {
      _id: 4,
      title: "Conclusion",
      description: "Wrap up the course",
      duration: "1 hour",
      lessons: [
        {
          _id: 401,
          title: "Wrapping Up Video",
          type: "video",
          url: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
        },
        {
          _id: 402,
          title: "Final Thoughts PDF",
          type: "pdf",
          url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
        },
      ],
    },
  ],
  bannerUrl:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
  isEnrolled: true,
  price: "$24.42",
};

const CourseDetails: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const aboutText = "Node.js course covering basics to advanced.";
  const discussionContent = <div>Discussion forum coming soon...</div>;
  const recentVideos = <div>Recent videos here.</div>;
  const bookmarkContent = <div>No bookmarks yet.</div>;
  const certificateContent = (
    <div>Certificates appear here when available.</div>
  );

  const courseContentTab = isMobile ? (
    <ContentSlider
      sections={course.sections}
      selectedLessonId={selectedLesson?._id}
      onSelectLesson={setSelectedLesson}
    />
  ) : null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Enrolled content: video/tabs + slider as sidebar */}
        {course.isEnrolled && (
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
        )}
        {/* Enrolled: show ContentSlider at 4 units */}
        {!isMobile && course.isEnrolled && (
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", flexDirection: "column", width: "30%" }}
          >
            <Box sx={{ flex: 1, width: "100%" }}>
              <ContentSlider
                sections={course.sections}
                selectedLessonId={selectedLesson?._id}
                onSelectLesson={setSelectedLesson}
              />
            </Box>
          </Grid>
        )}
        {/* Unenrolled: show slider at 8 and pricing at 4 */}
        {!isMobile && !course.isEnrolled && (
          <>
            <Grid item xs={12} md={8} sx={{ width: "60%" }}>
              <ContentSlider
                sections={course.sections}
                selectedLessonId={selectedLesson?.id}
                onSelectLesson={setSelectedLesson}
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{}}>
              <PricingSectionCard
                bannerUrl={course.bannerUrl}
                title={course.title}
                price={course.price}
                offerPrice={course.offerPrice}
                validation={course.validation}
                offerText={course.offerText}
              />
            </Grid>
          </>
        )}
        {/* Unenrolled: mobile view, only show PricingSectionCard */}
        {isMobile && !course.isEnrolled && (
          <Grid item xs={12}>
            <PricingSectionCard
              id
              bannerUrl={course.bannerUrl}
              title={course.title}
              price={course.price}
              offerPrice={course.offerPrice}
              validation={course.validation}
              offerText={course.offerText}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CourseDetails;
