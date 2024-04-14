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
import { useSearchParams } from "react-router-dom";
import { getCurrentTime } from "../../../utils/timeUtils";
import { generateUniqueId } from "../../../utils/idUtils";
import useLocalStorage from "../../../hooks/useLocalStore";
import { Chat } from "../../ChatList/types";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedChats, updateStoredChats] = useLocalStorage<Chat[]>(
    "ChatItems",
    []
  );

  const onSubmit = (formData: FormData): void => {
    // For now we can create a random id, but when we have a real db,
    // let's make sure that we are not creating it here
    const uniqueId = generateUniqueId();
    const name = formData.get("name");
    const description = formData.get("description");
    const instructions = formData.get("instructions");

    if (name === null) {
      return; // Exit early if required data is missing
    }

    const newChat: Chat = {
      id: uniqueId,
      name: name.toString(),
      description: description?.toString(),
      instructions: instructions?.toString(),
      time: getCurrentTime(),
    };

    // 1: Update the chats in local storage
    updateStoredChats([newChat, ...storedChats]);

    // 2: Update the chat list
    addNewChat(newChat);

    // 3: Update the chat id in the url
    searchParams.set("id", uniqueId.toString());
    setSearchParams(searchParams);
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
            rows={4}
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            autoFocus
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
