import { Stack, Typography, Button } from "@mui/material";
import NoChat from "../../assets/Illustration/NoChat";
import FormDialog from "../Chats/FormDialog";
import { useState } from "react";

const InitialScreen: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const reloadItems = () => {
    console.log("hi");
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
      <FormDialog
        isOpen={isDialogOpen}
        isEdit={false}
        onClose={() => setIsDialogOpen(false)}
        reloadItems={reloadItems}
      />
    </Stack>
  );
};

export default InitialScreen;
