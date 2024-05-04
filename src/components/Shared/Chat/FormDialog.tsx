import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Chat } from "../../ChatList/types";
import { USER_ID } from "../../../data";

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  addNewChat: (newChat: Chat) => void;
}

const FormDialog: React.FC<FormDialogProps> = ({
  isOpen,
  onClose,
  addNewChat,
}) => {
  const onSubmit = (formData: FormData): void => {
    const name = formData.get("name");
    const description = formData.get("description");
    const instructions = formData.get("instructions");

    if (name === null || instructions === null) {
      return;
    }

    const newChat: Chat = {
      user_id: USER_ID,
      name: name.toString(),
      description: description?.toString(),
      instructions: instructions.toString(),
    };

    addNewChat(newChat);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create a new GPT chat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In this form you can instruct a new chat GPT
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="standard"
            sx={{ mb: 2 }}
          />
          <TextField
            autoFocus
            label="Description"
            name="description"
            multiline
            rows={2}
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            autoFocus
            required
            label="Instructions"
            name="instructions"
            multiline
            rows={10}
            variant="standard"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
