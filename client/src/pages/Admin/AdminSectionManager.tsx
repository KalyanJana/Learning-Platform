// src/pages/AdminSectionManager.tsx
import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import apiClient from "../../utils/apiClient";
import { useCourseStore } from "../../store/useCourseStore";

export default function AdminSectionManager() {
  const { courses, fetchCourses } = useCourseStore();
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return;
    setAdding(true);
    try {
      const resp = await apiClient.post(`/courses/${courseId}/sections`, {
        title,
        description,
      });
      setResult(resp.data);
      setTitle("");
      setDescription("");
      fetchCourses(); // Refresh
    } catch (error: any) {
      setResult({ error: error.message });
    }
    setAdding(false);
  };

  return (
    <Box sx={{ p: 3, mb: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" mb={2}>
        Add Section to Course
      </Typography>
      <form onSubmit={handleAddSection}>
        <TextField
          select
          label="Choose Course"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          fullWidth
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
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Section Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={adding || !courseId}
        >
          {adding ? "Adding..." : "Add Section"}
        </Button>
      </form>
      {result && (
        <Box mt={2}>
          {result._id ? (
            <Typography color="success.main">
              Added section: {result.title}
            </Typography>
          ) : (
            <Typography color="error.main">{result.error}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
