import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/ChatWindow/ChatWindow";
import Chats from "../../components/ChatList/ChatList";
import useResponsive from "../../hooks/useResponsive";
import InitialScreen from "../../components/ChatWindow/InitialScreen";
import FormDialog from "../../components/Shared/Chat/FormDialog";
import { useState } from "react";
import { Chat } from "../../components/ChatList/types";
import { useSearchParams } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStore";

const GeneralApp: React.FC = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");

  const [searchParams] = useSearchParams();
  const chatIdString = searchParams.get("id");
  const chatId = chatIdString ? parseInt(chatIdString) : null;

  const [isOpen, setIsOpen] = useState(false);

  // Used for loading the existing chats
  const [storedChatItems] = useLocalStorage<Chat[]>("ChatItems", []);
  const [currentChats, setCurrentChats] = useState(storedChatItems);

  // Used for opening the right chat when a new chat is added or selected
  const [currentChat, setCurrentChat] = useState<Chat | undefined>();

  // On adding a new chat, we need to add it to the history bar
  const addAndOpenNewChat = (newChat: Chat) => {
    setCurrentChats([newChat, ...currentChats]);
  };

  const isDialogOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  useEffect(() => {
    setCurrentChat(currentChats.find((chat) => chat.id === chatId));
  }, [chatId, currentChats]);

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
            <Conversation currentChat={currentChat} />
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
