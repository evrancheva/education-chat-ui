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
import { ChatItem } from "../../Chats/types";
import { getCurrentTime } from "../../../utils/timeUtils";
import { generateUniqueId } from "../../../utils/idUtils";
import useLocalStorage from "../../../hooks/useLocalStore";

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  addAndOpenNewChat: (newChat: ChatItem) => void;
}

const FormDialog: React.FC<FormDialogProps> = ({
  isOpen,
  onClose,
  addAndOpenNewChat,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedChatItems, setStoredChatItems] = useLocalStorage<ChatItem[]>(
    "ChatItems",
    []
  );

  const onSubmit = (formData: FormData): void => {
    // For now we can create a random id, but when we have a real db,
    // let's make sure that we are not creating it here
    const uniqueId = generateUniqueId();

    const newChatItem: ChatItem = {
      id: uniqueId,
      name: formData.get("name")?.toString(),
      description: formData.get("description")?.toString(),
      instructions: formData.get("instructions")?.toString(),
      time: getCurrentTime(),
    };

    // 1: Update the chats in local storage
    setStoredChatItems([newChatItem, ...storedChatItems]);

    // 2: Update the history bar + open the new chat
    addAndOpenNewChat(newChatItem);

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
          />
          <TextField
            autoFocus
            required
            label="Description"
            name="description"
            multiline
            rows={4}
            variant="standard"
            fullWidth
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
