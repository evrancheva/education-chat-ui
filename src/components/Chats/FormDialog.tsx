import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  addNewChatItem: (form: FormData) => void;
}

const FormDialog: React.FC<FormDialogProps> = ({
  isOpen,
  onClose,
  addNewChatItem,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    addNewChatItem(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create a new GPT chat</DialogTitle>
        <DialogContent>
          <DialogContentText>Yayyyy</DialogContentText>
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
