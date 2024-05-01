import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { PlusCircle } from "phosphor-react";
import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStore";
import { useEffect } from "react";
import ChatItem from "./ChatItem";
import type { Chat } from "./types";

interface Props {
  setDialogOpen: (isOpen: boolean) => void;
  chats: Chat[];
}

const Chats: React.FC<Props> = ({ setDialogOpen, chats }) => {
  const [isAdmin] = useLocalStorage<boolean>("IsAdmin", true);

  const [currentChats, setCurrentChats] = useState(chats);

  // Update the chats in the chat bar when chats prop changes
  useEffect(() => {
    setCurrentChats(chats);
  }, [chats]);

  const removeChat = (id: string) => {
    const updatedChatItems = currentChats.filter((chat) => chat.chat_id !== id);
    // Remove it from the chat bar
    setCurrentChats(updatedChatItems);

    // TO DO: Remove it from localStorage -> Delete from DB
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
            onClick={() => setDialogOpen(true)}
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
