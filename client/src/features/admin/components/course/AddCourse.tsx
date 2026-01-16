import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useCreateCourse } from "../../../../hooks/useCourseHooks";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState("");


   /* ✅ Create course mutation */
  const createCourseMutation = useCreateCourse();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    createCourseMutation.mutate({
      title,
      description,
      thumbnail,
      price: Number(price),
    });
  };

  return (
    <form>
      <Typography variant="h6" mb={2}>
        Create New Course
      </Typography>

      {/* ✅ ERROR */}
      {createCourseMutation.isError && (
        <Typography color="error" mb={2}>
          {(createCourseMutation.error as any)?.response?.data?.message ||
            "Failed to create course"}
        </Typography>
      )}

      {/* ✅ SUCCESS */}
      {createCourseMutation.isSuccess && (
        <Typography color="success.main" mb={2}>
          Course created successfully!
        </Typography>
      )}

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
        label="Thumbnail URL"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={createCourseMutation.isPending}
        fullWidth
      >
        {createCourseMutation.isPending ? (
          <CircularProgress size={24} />
        ) : (
          "Create Course"
        )}
      </Button>
    </form>
  );
}
