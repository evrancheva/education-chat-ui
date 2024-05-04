import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor:
          "rgba(255, 255, 255, 0.8)" /* Semi-transparent white background */,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <CircularProgress
        sx={{ marginBottom: "16px" }}
        size={50}
        thickness={4}
        color="primary"
      />
      <Typography variant="body1" color="textPrimary">
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
