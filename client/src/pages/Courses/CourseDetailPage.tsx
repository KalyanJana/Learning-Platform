import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import styles from "./CourseDetailPage.module.scss";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Mock data
  const course = {
    id: courseId,
    title: "React Basics",
    description: "This is a complete course to learn React from scratch.",
    price: 499,
  };

  return (
    <Container className={styles.detail}>
      <Typography variant="h4" gutterBottom>
        {course.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {course.description}
      </Typography>
      <Typography variant="h6" color="primary">
        Price: ₹{course.price}
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/purchase/${course.id}`)}
        >
          Purchase Now
        </Button>
      </Box>
    </Container>
  );
};

export default CourseDetailPage;
