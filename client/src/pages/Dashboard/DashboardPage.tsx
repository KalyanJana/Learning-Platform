import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { useAuthStore } from "../../store/authStore";
import styles from "./DashboardPage.module.scss";

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  const mockCourses = [
    { id: 1, title: "React Basics", description: "Learn fundamentals of React." },
    { id: 2, title: "TypeScript Mastery", description: "Strong typing in JS projects." },
  ];

  return (
    <Container className={styles.dashboard}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.email || "User"}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your Courses
      </Typography>

      <Grid container spacing={3}>
        {mockCourses.map((course) => (
          <Grid item xs={12} md={4} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {course.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  href={`/courses/${course.id}`}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DashboardPage;
