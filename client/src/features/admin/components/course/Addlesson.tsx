import React, { useState } from "react";
import { TextField, MenuItem, Button, Typography, Box } from "@mui/material";
import {
  useFetchCourses,
  useCreateLesson,
} from "../../../../hooks/useCourseHooks";

export default function AddLesson() {
  const [courseId, setCourseId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("video");
  const [resourceUrl, setResourceUrl] = useState("");

  /* ------------------ FETCH COURSES ------------------ */
  const {
    data: courses = [],
    isLoading: isCoursesLoading,
    isError: isCoursesError,
    error: coursesError,
  } = useFetchCourses();

  /* ------------------ CREATE LESSON MUTATION ------------------ */
  const {
    mutate: createLesson,
    isPending,
    isError,
    error,
    isSuccess,
    data: createdLesson,
  } = useCreateLesson();

  /* ------------------ DERIVED SECTIONS ------------------ */
  const curSections = courses.find((c) => c._id === courseId)?.sections || [];

  /* ------------------ SUBMIT HANDLER ------------------ */
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      courseId,
      sectionId,
      title: title || resourceUrl.split("/").pop(),
      url: resourceUrl,
      type,
    };

    createLesson(payload, {
      onSuccess: () => {
        // reset form
        setTitle("");
        setResourceUrl("");
      },
    });
  };

  /* ------------------ UI STATES ------------------ */
  if (isCoursesLoading) {
    return <Typography>Loading courses...</Typography>;
  }

  if (isCoursesError) {
    return (
      <Typography color="error">{(coursesError as Error).message}</Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Add Lesson (Video / PDF by URL)
      </Typography>

      <form onSubmit={handleUpload}>
        {/* Course */}
        <TextField
          select
          label="Course"
          value={courseId}
          onChange={(e) => {
            setCourseId(e.target.value);
            setSectionId("");
          }}
          fullWidth
          required
          sx={{ mb: 2 }}
        >
          {courses.map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.title}
            </MenuItem>
          ))}
        </TextField>

        {/* Section */}
        <TextField
          select
          label="Section"
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
          disabled={!courseId}
        >
          {curSections.map((s) => (
            <MenuItem key={s._id} value={s._id}>
              {s.title}
            </MenuItem>
          ))}
        </TextField>

        {/* Lesson title */}
        <TextField
          label="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        {/* Type */}
        <TextField
          select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="video">Video</MenuItem>
          <MenuItem value="pdf">PDF</MenuItem>
        </TextField>

        {/* URL */}
        <TextField
          label={type === "video" ? "Video URL" : "PDF URL"}
          value={resourceUrl}
          onChange={(e) => setResourceUrl(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!courseId || !sectionId || !resourceUrl || isPending}
        >
          {isPending ? "Saving..." : "Save Lesson"}
        </Button>
      </form>

      {/* ------------------ RESULT MESSAGES ------------------ */}
      {isSuccess && (
        <Typography mt={2} color="success.main">
          Lesson created successfully
        </Typography>
      )}

      {isError && (
        <Typography mt={2} color="error">
          {(error as Error).message}
        </Typography>
      )}
    </Box>
  );
}
