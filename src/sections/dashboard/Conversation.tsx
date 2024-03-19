import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

interface Message {
  type: string;
  message: string;
  incoming: boolean;
  outgoing: boolean;
}

const TextMsg: React.FC<{ el: Message }> = ({ el }) => {
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
          {el.message}
        </Typography>
      </Box>
    </Stack>
  );
};

export { TextMsg };
