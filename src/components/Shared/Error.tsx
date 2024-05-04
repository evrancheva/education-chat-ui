import React from "react";
import { Container, Typography } from "@mui/material";

const ErrorPage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary">
        {message}
      </Typography>
    </Container>
  );
};

export default ErrorPage;
