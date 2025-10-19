import React from 'react';
import { Box, Typography, Paper, Avatar, Rating, Grid, Divider } from '@mui/material';

// Dummy testimonials data
const testimonials = [
  {
    name: "Rohit S.",
    comment: "The platform has streamlined my cardiology studies, and the interactive courses are top-notch!",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg"
  },
  {
    name: "Sneha M.",
    comment: "Superb resources and real-time doubt clearing. Highly recommended for medical professionals!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Amit Gupta",
    comment: "The admin section is really helpful for managing student progress and content publishing.",
    avatar: "https://randomuser.me/api/portraits/men/58.jpg"
  }
];

const AboutUs: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ maxWidth: 1000, mx: 'auto', p: 4, mt: 4, borderRadius: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: "center" }}>
        About Us
      </Typography>
      
      <Divider sx={{ my: 2 }} />

      <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
        Our learning platform empowers medical students and professionals with interactive courses, real-world case studies, and advanced cardiology resources. Whether you’re an admin, student, or staff, you’ll find tools for continuous learning, collaboration, and streamlined management.
      </Typography>
      
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>Our Goal</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 900, mx: "auto" }}>
          To become India’s leading digital destination for cardiology education and training, with the best-in-class technology and community engagement.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
        <Rating value={4.7} precision={0.1} readOnly size="large" />
        <Typography variant="body1" sx={{ ml: 2, fontWeight: "bold" }}>
          4.7/5.0
        </Typography>
        <Typography variant="body2" sx={{ ml: 2, color: "text.secondary" }}>
          (Based on 350+ reviews)
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>Student Comments</Typography>
        <Grid container spacing={2}>
          {testimonials.map((testi, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar src={testi.avatar} alt={testi.name} sx={{ mr: 2 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{testi.name}</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  "{testi.comment}"
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default AboutUs;
