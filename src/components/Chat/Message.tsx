import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { Message as MessageModel } from "./types";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

const Message: React.FC<{ el: MessageModel }> = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent={el.incoming ? "start" : "end"}
      alignItems="center"
    >
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: el.incoming
            ? alpha(theme.palette.background.default, 1)
            : theme.palette.primary.main,
          borderRadius: 1.5,
          maxWidth: "90%",
        }}
      >
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text.primary : "#fff"}
        >
          <Latex>{el.text}</Latex>
        </Typography>
      </Box>
    </Stack>
  );
};

export { Message };
