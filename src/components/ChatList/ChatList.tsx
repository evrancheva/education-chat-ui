import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { PlusCircle } from "phosphor-react";
import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStore";
import { useEffect } from "react";
import ChatItem from "./ChatItem";
import type { Chat } from "./types";
import { useMutation } from "@apollo/client";
import { DELETE_CHAT_MUTATION } from "../../graphQl/chatMutations";

interface Props {
  setDialogOpen: (isOpen: boolean) => void;
  chats: Chat[];
}

const Chats: React.FC<Props> = ({ setDialogOpen, chats }) => {
  const [deleteChat] = useMutation(DELETE_CHAT_MUTATION);
  const [isAdmin] = useLocalStorage<boolean>("IsAdmin", true);

  const [currentChats, setCurrentChats] = useState(chats);

  // Update the chats in the chat bar when chats prop changes
  useEffect(() => {
    setCurrentChats(chats);
  }, [chats]);

  const deleteChatFromDb = async (id: number) => {
    try {
      const { data } = await deleteChat({ variables: { chatId: id } });
      console.log("Chat deleted successfully:", data);
    } catch (error: any) {
      console.error("Error deleting chat:", error.message);
    }
  };

  const removeChat = (id: number) => {
    const updatedChatItems = currentChats.filter((chat) => chat.id !== id);
    // Remove it from the chat bar
    setCurrentChats(updatedChatItems);
    deleteChatFromDb(id);
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
