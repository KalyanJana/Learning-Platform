// src/pages/AdminSectionForm.tsx
import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Typography } from "@mui/material";
// import apiClient from "../../utils/apiClient";
// import { useCourseStore } from "../../store/courseStore";

const courses = [
    {id: '1', title: "React Basic"},
    {id: '2', title: "Node basic"},
]

export default function AddSection() {
//   const { courses, fetchCourses } = useCourseStore();
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);


  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!courseId) return;
    // setLoading(true);
    // try {
    //   const res = await apiClient.post(`/courses/v1/${courseId}/sections`, {
    //     title,
    //     description,
    //     order: 0, // You can add order logic here
    //   });
    //   setResult(res.data);
    //   setTitle("");
    //   setDescription("");
    //   fetchCourses();
    // } catch (err: any) {
    //   setResult({ error: err.message });
    // }
    // setLoading(false);
  };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

  return (
    <form onSubmit={handleAdd}>
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
      <Button type="submit" variant="contained" disabled={loading || !courseId}>
        {loading ? "Adding..." : "Add Section"}
      </Button>
      {result && (
        <Typography mt={2} color={result.error ? "error" : "success.main"}>
          {result.error ? result.error : `Added section: ${result.title}`}
        </Typography>
      )}
    </form>
  );
}
