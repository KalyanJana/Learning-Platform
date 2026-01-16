// src/pages/AdminCourseManager.tsx
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import apiClient from "../../utils/apiClient";
import { useCourseStore } from "../../store/useCourseStore";

export default function AdminCourseManager() {
  const { fetchCourses } = useCourseStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [price, setPrice] = useState("");
  const [creating, setCreating] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const resp = await apiClient.post("/courses", {
        title,
        description,
        bannerUrl,
        price: parseFloat(price),
      });
      setResult(resp.data);
      setTitle("");
      setDescription("");
      setBannerUrl("");
      setPrice("");
      fetchCourses(); // Refresh list in course store
    } catch (error: any) {
      setResult({ error: error.message });
    }
    setCreating(false);
  };

  return (
    <Box sx={{ p: 3, mb: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" mb={2}>
        Add New Course
      </Typography>
      <form onSubmit={handleCreateCourse}>
        <TextField
          label="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Banner URL"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <Button type="submit" variant="contained" fullWidth disabled={creating}>
          {creating ? "Creating..." : "Create Course"}
        </Button>
      </form>
      {result && (
        <Box mt={2}>
          {result._id ? (
            <Typography color="success.main">
              Created course: {result.title}
            </Typography>
          ) : (
            <Typography color="error.main">{result.error}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
