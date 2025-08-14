import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ textAlign: "center", py: 3, mt: 6, borderTop: "1px solid #eee" }}>
      <Typography variant="body2">© {new Date().getFullYear()} LearnX</Typography>
    </Box>
  );
}