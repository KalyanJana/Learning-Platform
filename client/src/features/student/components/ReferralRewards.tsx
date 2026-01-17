// src/features/student/components/ReferralRewards.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Chip,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ContentCopy,
  EmojiEvents,
  CheckCircle,
  AccessTime,
} from "@mui/icons-material";
import {
  getReferralStats,
  getReferralLeaderboard,
} from "../../../api/referral";
import { useAuthStore } from "../../../store/useAuthStore";

interface ReferralData {
  referralCode: string;
  rewardPoints: number;
  totalReferrals: number;
  referredUsers: Array<{
    userId: string;
    name: string;
    email: string;
    mobileNo: string;
    enrolledDate: string;
    rewardEarned: number;
    status: string;
  }>;
  transactionHistory: Array<{
    _id: string;
    amount: number;
    type: "CREDIT" | "DEBIT";
    reason: string;
    date: string;
  }>;
}

const ReferralRewards = () => {
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const authStore = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch referral stats
        const stats = await getReferralStats();
        setReferralData(stats);

        // Fetch leaderboard
        const leaders = await getReferralLeaderboard(5);
        setLeaderboard(leaders);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load referral data");
        console.error("Error fetching referral data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopyCode = () => {
    if (referralData?.referralCode) {
      navigator.clipboard.writeText(referralData.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

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
                  value={referralData?.referralCode || ""}
                  fullWidth
                  InputProps={{ readOnly: true }}
                  sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                />
                <Button
                  variant="contained"
                  startIcon={<ContentCopy />}
                  onClick={handleCopyCode}
                  color={copied ? "success" : "primary"}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Share this code with friends and earn ₹250 when they register!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Rewards Summary */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "primary.main", color: "white" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <EmojiEvents />
                <Typography variant="h6">Total Rewards Earned</Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" mb={1}>
                ₹{referralData?.rewardPoints || 0}
              </Typography>
              <Typography variant="body2" mt={1}>
                From {referralData?.totalReferrals || 0} successful referral(s)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Referral History */}
        {referralData && referralData.referredUsers.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>
                  Referral History
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "background.default" }}>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Enrolled</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Earned</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {referralData.referredUsers.map((referral) => (
                        <TableRow key={referral.userId}>
                          <TableCell>{referral.name}</TableCell>
                          <TableCell>{referral.email}</TableCell>
                          <TableCell>
                            {formatDate(referral.enrolledDate)}
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={<CheckCircle />}
                              label={referral.status}
                              size="small"
                              color="success"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color="success.main"
                            >
                              +₹{referral.rewardEarned}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Transaction History */}
        {referralData && referralData.transactionHistory.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>
                  Reward Transactions
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "background.default" }}>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {referralData.transactionHistory.map((transaction) => (
                        <TableRow key={transaction._id}>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell>
                            <Chip
                              label={transaction.type}
                              size="small"
                              color={
                                transaction.type === "CREDIT"
                                  ? "success"
                                  : "error"
                              }
                              variant="filled"
                            />
                          </TableCell>
                          <TableCell>{transaction.reason}</TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color={
                                transaction.type === "CREDIT"
                                  ? "success.main"
                                  : "error.main"
                              }
                            >
                              {transaction.type === "CREDIT" ? "+" : "-"}₹
                              {transaction.amount}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>
                  Top Referrers 🏆
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "background.default" }}>
                        <TableCell>Rank</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Referrals</TableCell>
                        <TableCell align="right">Total Rewards</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leaderboard.map((user, index) => (
                        <TableRow
                          key={user.userId}
                          sx={{
                            backgroundColor:
                              index === 0
                                ? "warning.light"
                                : index === 1
                                  ? "info.light"
                                  : "inherit",
                          }}
                        >
                          <TableCell fontWeight="bold">#{index + 1}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell align="center">
                            {user.totalReferrals}
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight="bold">
                              ₹{user.totalRewards}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Empty State */}
        {(!referralData || referralData.referredUsers.length === 0) && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" color="text.secondary" mb={2}>
                  No referrals yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Share your referral code with friends to start earning
                  rewards!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ReferralRewards;
