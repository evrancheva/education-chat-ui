import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { PlusCircle } from "phosphor-react";
import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStore";
import { useEffect } from "react";
import ChatItem from "./ChatItem";
import type { Chat } from "./types";

interface Props {
  isDialogOpen: (isOpen: boolean) => void;
  chats: Chat[];
}

const Chats: React.FC<Props> = ({ isDialogOpen, chats }) => {
  const [isAdmin] = useLocalStorage<boolean>("IsAdmin", false);

  const openDialog = () => {
    isDialogOpen(true);
  };

  const [currentChats, setCurrentChats] = useState(chats);
  const [storedChats, updateStoredChats] = useLocalStorage<Chat[]>(
    "ChatItems",
    []
  );

  // Use useEffect to update the chats in the bar when chats prop changes
  useEffect(() => {
    setCurrentChats(chats);
  }, [chats]);

  const removeChat = (id: number) => {
    const updatedChatItems = storedChats.filter((chat) => chat.id !== id);
    // Remove it from the list
    setCurrentChats(updatedChatItems);

    // Remove it from localStorage
    updateStoredChats(updatedChatItems);
  };

  return (
    <Box
      p={2}
      sx={{
        width: 350,
        backgroundColor: "#F8FAFF",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Typography
          variant="h5"
          sx={{
            color: "#676667",
            display: "flex",
            justifyContent: "space-between",
          }}
          mb={2}
          pt={3}
        >
          All Chats
          <IconButton
            sx={{ width: "max-content", color: "#1976d2", ml: "auto" }}
            onClick={openDialog}
          >
            {isAdmin ? <PlusCircle /> : null}
          </IconButton>
        </Typography>
        <Box pr={2} sx={{ overflowY: "scroll", height: "100%" }}>
          {currentChats.map((el, idx) => {
            return <ChatItem key={idx} chat={el} removeChat={removeChat} />;
          })}
        </Box>
      </Stack>
    </Box>
  );
};

export default Chats;
