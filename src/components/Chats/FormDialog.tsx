import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "react-router-dom";
import { ChatItem } from "./types";
import useLocalStorage from "../../utils/useLocalStore";
import { useEffect } from "react";
import { getCurrentTime } from "../../utils/timeUtils";

interface FormDialogProps {
  isOpen: boolean;
  isEdit: boolean;
  onClose: () => void;
  reloadItems: () => void;
}

const FormDialog: React.FC<FormDialogProps> = ({
  isOpen,
  isEdit,
  reloadItems,
  onClose,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const chatItems = localStorage.getItem("ChatItems");
  const currentChatItems: ChatItem[] = chatItems ? JSON.parse(chatItems) : [];

  const [storedChatItems, setStoredChatItems] = useLocalStorage(
    "ChatItems",
    currentChatItems
  );

  const onSubmit = (formData: FormData): void => {
    const id = 20;
    const newChatItem: ChatItem = {
      id: id,
      name: formData.get("name")?.toString(),
      description: formData.get("description")?.toString(),
      instructions: formData.get("instructions")?.toString(),
      time: getCurrentTime(),
    };

    const updatedChatItems = [newChatItem, ...storedChatItems];
    // Update the local storage with the new array including the new chat item
    setStoredChatItems(updatedChatItems);

    searchParams.set("id", id.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    reloadItems();
  }, [storedChatItems]);

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
