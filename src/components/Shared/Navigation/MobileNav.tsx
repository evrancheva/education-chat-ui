import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { List as ListIcon } from "phosphor-react";
import useLocalStorage from "../../../hooks/useLocalStore";
import { Chat } from "../../ChatList/types";
import { PlusCircle, X } from "phosphor-react";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_CHAT_MUTATION } from "../../../graphQl/chatMutations";

interface Props {
  setDialogOpen: (isOpen: boolean) => void;
  chats: Chat[];
  isDrawerOpen: boolean;
}

const MobileNav: React.FC<Props> = ({ setDialogOpen, chats, isDrawerOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAdmin] = useLocalStorage<boolean>("IsAdmin", true);
  
  const [open, setOpen] = useState(isDrawerOpen);
  const [deleteChat] = useMutation(DELETE_CHAT_MUTATION);

  const [currentChats, setCurrentChats] = useState<Chat[]>([]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOnClick = (id: number) => {
    searchParams.set("id", id.toString());
    setSearchParams(searchParams);
    toggleDrawer();
  };

  const removeChat = async (id: number) => {
    //delete from db
    await deleteChat({ variables: { chatId: id } });

    const updatedChatItems = currentChats.filter((chat) => chat.id !== id);
    setCurrentChats(updatedChatItems);

    searchParams.delete("id");
    setSearchParams(searchParams);

    // Close the drawer if it's the last chat
    if (updatedChatItems.length === 0) {
      setOpen(false);
    }
  };

  useEffect(() => {
    setCurrentChats(chats);
    setOpen(isDrawerOpen);
  }, [chats, isDrawerOpen]);

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <ListIcon size={32} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: { width: "80%" },
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#676667",
              display: "flex",
              alignItems: "center",
            }}
            ml={2}
            pt={2}
          >
            All Chats
            {isAdmin && (
              <IconButton
                sx={{ color: "#1976d2", position: "absolute", right: "1rem" }}
                onClick={() => setDialogOpen(true)}
              >
                <PlusCircle />
              </IconButton>
            )}
          </Typography>
          <Divider component="li" />
        </Box>

        <List>
          {currentChats.map((el) => (
            <ListItem key={el.id}>
              <ListItemText
                primary={el.name}
                onClick={() => handleOnClick(el.id)}
              />
              <X onClick={() => removeChat(el.id)} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default MobileNav;
