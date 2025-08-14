import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className={styles.notFound}>
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        Oops! The page you are looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
