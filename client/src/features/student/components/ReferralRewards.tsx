// src/features/student/components/ReferralRewards.tsx
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, TextField, Chip } from '@mui/material';
import { ContentCopy, EmojiEvents } from '@mui/icons-material';

const ReferralRewards = () => {
  const referralCode = 'STUDENT2025XYZ';
  const totalRewards = 1250;
  const referrals = 5;

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Referral & Rewards
      </Typography>

      <Grid container spacing={3}>
        {/* Referral Code Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Referral Code
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mt={2}>
                <TextField
                  value={referralCode}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
                <Button variant="contained" startIcon={<ContentCopy />}>
                  Copy
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Share this code with friends and earn rewards!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Rewards Summary */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <EmojiEvents />
                <Typography variant="h6">Total Rewards Earned</Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold">
                ₹{totalRewards}
              </Typography>
              <Typography variant="body2" mt={1}>
                From {referrals} successful referrals
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Referral History */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Referral History
              </Typography>
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                  mb={1}
                  sx={{ bgcolor: 'background.default', borderRadius: 1 }}
                >
                  <Box>
                    <Typography variant="body1">Friend {item}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enrolled on Jan {item}, 2025
                    </Typography>
                  </Box>
                  <Chip label="₹250 Earned" color="success" />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReferralRewards;
