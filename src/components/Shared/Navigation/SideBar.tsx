import { Box, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Logo from "../../../assets/Images/logo.ico";
import { ChatCircleDots } from "phosphor-react";

const SideBar: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        width: 100,
        backgroundColor: "#F0F4FA",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        alignItems={"center"}
        spacing={4}
        py={3}
        justifyContent="space-between"
      >
        <Box
          sx={{
            height: 48,
            width: 48,
            borderRadius: 1.5,
            backgroundColor: theme.palette.primary.main,
          }}
          p={1}
        >
          <img src={Logo} alt="Tawk" height={48} width={48} />
        </Box>
        <Stack
          sx={{ width: "max-content" }}
          direction="column"
          alignItems={"center"}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
            p={1}
          >
            <IconButton sx={{ width: "max-content", color: "#ffffff" }}>
              <ChatCircleDots />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
