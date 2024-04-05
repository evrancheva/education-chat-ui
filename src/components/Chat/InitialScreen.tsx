import { Stack, Typography, Button } from "@mui/material";
import NoChat from "../../assets/Illustration/NoChat";

interface Props {
  isDialogOpen: (isOpen: boolean) => void;
}

const InitialScreen: React.FC<Props> = ({ isDialogOpen }) => {
  const openDialog = () => {
    isDialogOpen(true);
  };

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
      </Typography>
      <Button onClick={openDialog} variant="contained">
        new one
      </Button>
    </Stack>
  );
};

export default InitialScreen;
