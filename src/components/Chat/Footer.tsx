import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { PaperPlaneTilt } from "phosphor-react";
import { useTheme, styled } from "@mui/material/styles";

const StyledInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
  },
}));

interface FooterProps {
  handleQuestion: (question: string) => void;
}

const Footer: React.FC<FooterProps> = ({ handleQuestion }) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState("");

  const handleKeyChange = (e: KeyboardEvent) => {
    setInputValue(e.key);
  };

  const askQuestion = () => {
    setInputValue("");
    handleQuestion(inputValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleKeyChange(e);
      askQuestion();
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "transparent !important",
      }}
    >
      <Box
        p={1}
        sx={{
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Stack sx={{ width: "100%" }}>
            <StyledInput
              fullWidth
              placeholder="Write a message..."
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </Stack>
          <Box
            sx={{
              height: 48,
              width: 48,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
          >
            <Stack
              sx={{ height: "100%" }}
              alignItems="center"
              justifyContent="center"
            >
              <IconButton onClick={askQuestion}>
                <PaperPlaneTilt color="#ffffff" />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
