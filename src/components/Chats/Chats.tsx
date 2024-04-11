import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { ChatItem as ChatItemType } from "./types";
import { PlusCircle } from "phosphor-react";
import ChatItem from "./ChatItem";
import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStore";
import { getAllChats } from "../../database/chatRepository";

interface Props {
  isDialogOpen: (isOpen: boolean) => void;
  chats: ChatItemType[];
}

const Chats: React.FC<Props> = ({ isDialogOpen, chats }) => {
  const openDialog = () => {
    isDialogOpen(true);
  };

  const [currentChats, setCurrentChats] = useState(chats);
  const [storedChatItems, setStoredChatItems] = useLocalStorage(
    "ChatItems",
    getAllChats()
  );

  const removeChat = (id: number) => {
    const updatedChatItems = storedChatItems.filter((chat) => chat.id !== id);
    // Remove it from the list
    setCurrentChats(updatedChatItems);

    // Remove it from localStorage
    setStoredChatItems(updatedChatItems);
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
          All Custom Chats
          <IconButton
            sx={{ width: "max-content", color: "#1976d2", ml: "auto" }}
            onClick={openDialog}
          >
            <PlusCircle />
          </IconButton>
        </Typography>
        <Box pr={2} sx={{ overflowY: "scroll", height: "100%" }}>
          {currentChats.map((el, idx) => {
            return <ChatItem key={idx} chatItem={el} removeChat={removeChat} />;
          })}
        </Box>
      </Stack>
    </Box>
  );
};

export default Chats;
