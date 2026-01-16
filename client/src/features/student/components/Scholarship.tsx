// src/features/student/components/Scholarship.tsx
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Chip } from '@mui/material';
import { CheckCircle, HourglassEmpty } from '@mui/icons-material';

const Scholarship = () => {
  const scholarships = [
    {
      id: 1,
      title: 'Merit-Based Scholarship 2025',
      amount: '₹10,000',
      deadline: 'March 31, 2025',
      status: 'open',
      eligibility: 'Students with 80%+ attendance',
    },
    {
      id: 2,
      title: 'Need-Based Financial Aid',
      amount: '₹15,000',
      deadline: 'April 15, 2025',
      status: 'applied',
      eligibility: 'Family income < ₹5 Lakhs/year',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Scholarship Opportunities
      </Typography>

      <Grid container spacing={3}>
        {scholarships.map((scholarship) => (
          <Grid item xs={12} md={6} key={scholarship.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                  <Typography variant="h6">{scholarship.title}</Typography>
                  <Chip
                    label={scholarship.status === 'open' ? 'Open' : 'Applied'}
                    color={scholarship.status === 'open' ? 'success' : 'warning'}
                    icon={scholarship.status === 'open' ? <CheckCircle /> : <HourglassEmpty />}
                  />
                </Box>
                
                <Typography variant="h5" color="primary" mb={2}>
                  {scholarship.amount}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" mb={1}>
                  <strong>Eligibility:</strong> {scholarship.eligibility}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" mb={2}>
                  <strong>Deadline:</strong> {scholarship.deadline}
                </Typography>
                
                <Button
                  variant={scholarship.status === 'open' ? 'contained' : 'outlined'}
                  fullWidth
                  disabled={scholarship.status !== 'open'}
                >
                  {scholarship.status === 'open' ? 'Apply Now' : 'Application Submitted'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Scholarship;
