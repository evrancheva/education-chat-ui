import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/Chat/Conversation";
import Chats from "../../components/Chats/Chats";
import useResponsive from "../../hooks/useResponsive";
import InitialScreen from "../../components/Chat/InitialScreen";
import FormDialog from "../../components/Shared/Chat/FormDialog";
import { useState } from "react";
import { ChatItem } from "../../components/Chats/types";
import { useSearchParams } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStore";

const GeneralApp: React.FC = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const [searchParams] = useSearchParams();
  const chatIdString = searchParams.get("id");
  const chatId = chatIdString ? parseInt(chatIdString) : null;

  const [isOpen, setIsOpen] = useState(false);
  const [dynamicChatId, setDynamicChatId] = useState(chatId);

  // Display the right chats in the history bar
  const [storedChatItems] = useLocalStorage<ChatItem[]>("ChatItems", []);
  const [currentChats, setCurrentChats] = useState(storedChatItems);

  // On adding a new chat, we need to add it to the history bar
  const addAndOpenNewChat = (newChat: ChatItem) => {
    setCurrentChats([newChat, ...currentChats]);
    setDynamicChatId(newChat.id);
  };

  const isDialogOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return (
    <>
      <Stack direction="row" sx={{ width: "100%", height: "100vh" }}>
        {!isMobile && (
          <Chats isDialogOpen={isDialogOpen} chats={currentChats} />
        )}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFF",
            borderBottom: chatId ? "0px" : "6px solid #0162C4",
          }}
        >
          {chatId ? (
            <Conversation chatId={dynamicChatId} />
          ) : (
            <InitialScreen isDialogOpen={isDialogOpen} />
          )}
        </Box>
        <FormDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          addAndOpenNewChat={addAndOpenNewChat}
        />
      </Stack>
    </>
  );
};

export default GeneralApp;
