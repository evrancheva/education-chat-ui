import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NoChat from "../../assets/Illustration/NoChat";
import { useTheme } from "@mui/material/styles";

const InitialScreen: React.FC = () => {
  const theme = useTheme();
  return (
    <Stack
      spacing={2}
      sx={{ width: "100%", height: "100vh" }}
      alignItems="center"
      justifyContent={"center"}
    >
      <NoChat />
      <Typography variant="subtitle2">
        Select a conversation or start a{" "}
        <Link
          style={{
            color: theme.palette.primary.main,
            textDecoration: "none",
          }}
          /* To be improved later */
          to="/chat?id=0"
        >
          new one
        </Link>
      </Typography>
    </Stack>
  );
};

export default InitialScreen;
