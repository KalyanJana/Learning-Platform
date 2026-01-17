// src/pages/AdminSectionForm.tsx
import React, { useState } from "react";
import { TextField, MenuItem, Button, Typography } from "@mui/material";
import {
  useCreateSection,
  useFetchCourses,
} from "../../../../hooks/useCourseHooks";

export default function AddSection() {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");

  /* ------------------ FETCH COURSES ------------------ */
  const {
    data: courses = [],
    isLoading: isCoursesLoading,
    isError: isCoursesError,
    error: coursesError,
  } = useFetchCourses();

  /* ------------------ CREATE SECTION MUTATION ------------------ */
  const {
    mutate: createSection,
    isPending: isCreateSectionLoading,
    isError: isCreateSectionError,
    error: createSectionError,
    isSuccess,
    data: createdSection,
  } = useCreateSection();

  /* ------------------ SUBMIT HANDLER ------------------ */
  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      courseId,
      title,
    };

    createSection(payload, {
      onSuccess: () => {
        setTitle("");
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
    <form onSubmit={handleAddSection}>
      <Typography variant="h6" mb={2}>
        Add Section
      </Typography>
      <TextField
        select
        label="Course"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
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

      <TextField
        label="Section Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={!courseId || !title || isCreateSectionLoading}
      >
        {isCreateSectionLoading ? "Adding..." : "Add Section"}
      </Button>

      {isSuccess && (
        <Typography mt={2} color="success.main">
          Added section: {createdSection?.title}
        </Typography>
      )}

      {isCreateSectionError && (
        <Typography mt={2} color="error">
          {(createSectionError as Error).message}
        </Typography>
      )}
    </form>
  );
}
