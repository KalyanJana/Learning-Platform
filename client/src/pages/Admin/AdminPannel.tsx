// src/pages/AdminPanel.tsx
import React, { useState } from "react";
import {
  Grid, Box, Tabs, Tab, Paper, Typography
} from "@mui/material";
import AdminCourseForm from "./AdminCourseForm";
import AdminSectionForm from "./AdminSectionForm";
import AdminLessonForm from "./AdminLessonForm";

const ACTIONS = [
  { label: "Add New Course", value: "course" },
  { label: "Add Section", value: "section" },
  { label: "Add Lesson", value: "lesson" },
];

export default function AdminPanel() {
  const [tab, setTab] = useState("course");
  return (
    <Grid container spacing={4} sx={{ mt: 4 }}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2 }}>
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={(_, v) => setTab(v)}
            indicatorColor="primary"
            textColor="primary"
          >
            {ACTIONS.map((a) => (
              <Tab key={a.value} label={a.label} value={a.value} />
            ))}
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper sx={{ p: 3 }}>
          {tab === "course" && <AdminCourseForm />}
          {tab === "section" && <AdminSectionForm />}
          {tab === "lesson" && <AdminLessonForm />}
        </Paper>
      </Grid>
    </Grid>
  );
}
