import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  useMediaQuery,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import type { Theme } from "@mui/material/styles";
import ContentSlider from "../../components/course/ContentSlider";
import VideoContainer from "../../components/course/VideoContainer";
import ContentTabs from "../../components/course/ContentTabs";
import PricingSectionCard from "../../components/course/PricingSelectionCard";
import apiClient from "../../utils/apiClient";

// ======== INTERFACES ========
export interface LessonItem {
  _id: string;
  title: string;
  type: "video" | "pdf";
  url: string;
}

export interface Section {
  _id: string;
  title: string;
  description: string;
  duration?: string;
  lessons: LessonItem[];
}

export interface Course {
  _id: string;
  title: string;
  sections: Section[];
  bannerUrl: string;
  isEnrolled: boolean;
  price: string;
  validation?: string;
  offerPrice?: string;
  offerText?: string;
}

// ======== COMPONENT START ========
const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  // ===== Fetch Course =====
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get(`/courses/v1/${courseId}`);
        setCourse(data);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load course details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  // ===== LOADING STATE =====
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ===== ERROR STATE =====
  if (error || !course) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          {error ?? "Course not found"}
        </Typography>
      </Container>
    );
  }

  // ===== CONTENT =====
  const aboutText = course.description || "Course description not available.";
  const discussionContent = <div>Discussion forum coming soon...</div>;
  const recentVideos = <div>Recent videos coming soon...</div>;
  const bookmarkContent = <div>No bookmarks yet.</div>;
  const certificateContent = <div>Certificates will appear here.</div>;

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
        {/* ===== Enrolled: show video & course content ===== */}
        {/* {course.isEnrolled && ( */}
        {
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
        }

        {/* ===== Enrolled: sidebar for content list ===== */}
        {/* {!isMobile && course.isEnrolled && ( */}
        {!isMobile && (
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

        {/* ===== Not enrolled: show course preview with pricing ===== */}
        {/* {!isMobile && !course.isEnrolled && ( */}
        {!isMobile && (
          <>
            <Grid item xs={12} md={8} sx={{ width: "60%" }}>
              <ContentSlider
                sections={course.sections}
                selectedLessonId={selectedLesson?._id}
                onSelectLesson={setSelectedLesson}
              />
            </Grid>
            <Grid item xs={12} md={4}>
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

        {/* ===== Not enrolled: mobile view ===== */}
        {/* {isMobile && !course.isEnrolled && ( */}
        {isMobile && (
          <Grid item xs={12}>
            <PricingSectionCard
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
