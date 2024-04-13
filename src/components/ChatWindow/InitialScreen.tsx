import { Stack, Typography, Button } from "@mui/material";
import NoChat from "../../assets/Illustration/NoChat";
import useLocalStorage from "../../hooks/useLocalStore";

interface Props {
  isDialogOpen: (isOpen: boolean) => void;
}

const InitialScreen: React.FC<Props> = ({ isDialogOpen }) => {
  const [isAdmin] = useLocalStorage<boolean>("IsAdmin", false);
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
      {isAdmin ? (
        <>
          <Typography variant="subtitle2">
            Select a conversation or create a
          </Typography>
          <Button onClick={openDialog} variant="contained">
            new one
          </Button>
        </>
      ) : (
        <Typography variant="subtitle2">
          Select a conversation from the menu
        </Typography>
      )}
    </Stack>
  );
};

export default InitialScreen;
