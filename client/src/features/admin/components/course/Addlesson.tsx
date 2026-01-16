import React, { useState } from "react";
import {
  TextField, MenuItem, Button, Typography, Box
} from "@mui/material";
// import apiClient from "../../utils/apiClient";
// import { useCourseStore } from "../../store/courseStore";

const courses = [
    {id: '1', title: "React Basic"},
    {id: '2', title: "Node basic"},
]

export default function AddLesson() {
//   const { courses } = useCourseStore();
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("video");
  const [sectionId, setSectionId] = useState("");
  const [resourceUrl, setResourceUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  // Update available sections when course changes
  const curSections = courses.find((c) => c._id === courseId)?.sections || [];

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!resourceUrl || !sectionId || !courseId) return;
    // setUploading(true);

    // const data = {
    //   title: title || resourceUrl.split("/").pop() || "",
    //   url: resourceUrl,
    //   type,
    //   order: 0
    // };
    // try {
    //   const resp = await apiClient.post(
    //     `/courses/v1/${courseId}/sections/${sectionId}/lessons/url`,
    //     data
    //   );
    //   setResult(resp.data);
    //   setTitle(""); setResourceUrl("");
    // } catch (err: any) {
    //   setResult({ error: err.message });
    // }
    // setUploading(false);
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>Add Lesson (Video/PDF by URL)</Typography>
      <form onSubmit={handleUpload}>
        <TextField
          select
          label="Course"
          value={courseId}
          onChange={e => { setCourseId(e.target.value); setSectionId(""); }}
          fullWidth required sx={{ mb: 2 }}>
          {courses.map(c => <MenuItem key={c._id} value={c._id}>{c.title}</MenuItem>)}
        </TextField>
        <TextField
          select
          label="Section"
          value={sectionId}
          onChange={e => setSectionId(e.target.value)}
          fullWidth required sx={{ mb: 2 }}
          disabled={!courseId}>
          {curSections.map(s => <MenuItem key={s._id} value={s._id}>{s.title}</MenuItem>)}
        </TextField>
        <TextField
          label="Lesson Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth sx={{ mb: 2 }} />
        <TextField
          select
          label="Type"
          value={type}
          onChange={e => setType(e.target.value)}
          fullWidth required sx={{ mb: 2 }}>
          <MenuItem value="video">Video</MenuItem>
          <MenuItem value="pdf">PDF</MenuItem>
        </TextField>
        <TextField
          label={type === "video" ? "Video URL" : "PDF URL"}
          value={resourceUrl}
          onChange={e => setResourceUrl(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
          placeholder={type === "video"
            ? "https://your-video-host.com/lesson.m3u8"
            : "https://your-site.com/lesson.pdf"}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!resourceUrl || !sectionId || !courseId || uploading}>
          {uploading ? "Saving..." : "Save Lesson"}
        </Button>
      </form>
      {result && (
        <Box mt={2}>
          {result.url ? (
            <Typography color="success.main" noWrap>
              Saved: <a href={result.url} target="_blank" rel="noreferrer">{result.url}</a>
            </Typography>
          ) : (
            <Typography color="error" noWrap>{result.error}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
