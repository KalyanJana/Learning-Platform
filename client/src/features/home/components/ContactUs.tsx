import React, { useState } from 'react';
import { Paper, Box, Typography, TextField, Button, Divider, Grid, IconButton, InputAdornment } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactUs: React.FC = () => {
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  // Replace with your WhatsApp number
  const whatsappNumber = "+919900998877";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=Hello,%20I%20have%20a%20question%20about%20the%20learning%20platform`;

  return (
    <Paper elevation={3} sx={{ maxWidth: 900, mx: "auto", mt: 5, p: { xs: 2, md: 4 }, borderRadius: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: "center" }}>
        Contact Us
      </Typography>
      
      <Divider sx={{ mb: 3 }} />

      {/* Responsive two-column/single-row section */}
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 500 }}>
              Get in Touch
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Reach us anytime! We’re here to help with course info, platform support, or partnership inquiries.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="body2">support@learningplatform.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PhoneAndroidIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="body2">+91 99009 98877</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="body2">CMC Vellore, Tamil Nadu, India</Typography>
            </Box>
            <Button
              component="a"
              href={whatsappLink}
              target="_blank"
              startIcon={<WhatsAppIcon />}
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
            >
              Chat via WhatsApp
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
              Send a Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Your Name"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <TextField
                label="Your Email"
                variant="outlined"
                size="small"
                type="email"
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <TextField
                label="Comment / Query"
                variant="outlined"
                fullWidth
                multiline
                minRows={3}
                sx={{ mb: 2 }}
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" color="primary">
                        Send
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
                Submit
              </Button>
              {submitted && (
                <Typography variant="body2" sx={{ mt: 2, color: "green" }}>
                  Thank you! Your comment has been submitted.
                </Typography>
              )}
            </form>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContactUs;
