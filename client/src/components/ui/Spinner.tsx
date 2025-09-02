import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Spinner: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // fills full viewport height
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
