import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import apiClient from "../../utils/apiClient";
import { useCourseStore } from "../../store/useCourseStore";

export default function AdminCourseForm() {
  const { fetchCourses } = useCourseStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        price,
        bannerUrl,
      };
      const res = await apiClient.post("/courses/v1", payload);
      setResult(res.data);
      setTitle("");
      setDescription("");
      setPrice("");
      setBannerUrl("");
      fetchCourses();
    } catch (err: any) {
      setResult({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleCreate}>
      <Typography variant="h6" mb={2}>
        Create New Course
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Banner Image URL"
        value={bannerUrl}
        onChange={(e) => setBannerUrl(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
        placeholder="https://your-image-url.com/banner.jpg"
      />

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Creating..." : "Create Course"}
      </Button>
      {result && (
        <Typography mt={2} color={result.error ? "error" : "success.main"}>
          {result.error ? result.error : `Created: ${result.title}`}
        </Typography>
      )}
    </form>
  );
}
