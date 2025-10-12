import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import apiClient from "../../utils/apiClient";
import { useCourseStore } from "../../store/courseStore";
import { useAuthStore } from "../../store/authStore";
import { Navigate } from "react-router-dom";

export default function AdminUploadPage() {
  const user = useAuthStore((state) => state.user);
  const { courses, loading, error, fetchCourses } = useCourseStore();

  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"video" | "pdf">("video");
  const [title, setTitle] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);

  useEffect(() => {
    if (user) fetchCourses();
  }, [user, fetchCourses]);

  // Redirect non-admin users
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setFileType(f?.type.startsWith("video") ? "video" : "pdf");
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseId(e.target.value);
    setSectionId(""); // reset section when course changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !sectionId || !courseId) {
      alert("Please select a course, section, and file.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title || file.name);
    formData.append("type", fileType);
    formData.append("order", "0"); // optional

    try {
      const resp = await apiClient.post(
        `/courses/${courseId}/sections/${sectionId}/lessons/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUploadResult(resp.data);
      setFile(null);
      setTitle("");
    } catch (err: any) {
      setUploadResult({ error: err.message });
    }
    setUploading(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" mb={2}>
        Admin Upload
      </Typography>

      {loading && <CircularProgress />}
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          select
          label="Select Course"
          value={courseId}
          onChange={handleCourseChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        >
          {courses.map((course) => (
            <MenuItem key={course._id} value={course._id}>
              {course.title}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Select Section"
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
          disabled={!courseId}
        >
          {courseId &&
            courses
              .find((c) => c._id === courseId)
              ?.sections.map((section) => (
                <MenuItem key={section._id} value={section._id}>
                  {section.title}
                </MenuItem>
              ))}
        </TextField>

        <TextField
          label="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          placeholder="Optional"
        />

        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          fullWidth
          sx={{ mb: 2 }}
          disabled={uploading}
        >
          {file ? file.name : "Select Video/PDF"}
          <input
            type="file"
            hidden
            accept="video/*,application/pdf"
            onChange={handleFileChange}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!file || !sectionId || !courseId || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </form>

      {uploadResult && (
        <Box mt={2}>
          {uploadResult.url ? (
            <Typography color="success.main" noWrap>
              Uploaded:{" "}
              <a href={uploadResult.url} target="_blank" rel="noreferrer">
                {uploadResult.url}
              </a>
            </Typography>
          ) : (
            <Typography color="error.main" noWrap>{uploadResult.error}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
