import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Used for loading the existing chats
  const [storedChatItems] = useLocalStorage<Chat[]>("ChatItems", []);
  const [currentChats, updateCurrentChats] = useState(storedChatItems);

  // Used for opening the right chat when a new chat is added or selected
  const [currentChat, setCurrentChat] = useState<Chat | undefined>();

  // On adding a new chat, we need to add it to the history bar
  const addNewChat = (newChat: Chat) => {
    updateCurrentChats([newChat, ...currentChats]);
  };

  const setDialogOpen = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
  };

  // This makes sure that the right chat is displayed on update of id search param
  useEffect(() => {
    setCurrentChat(currentChats.find((chat) => chat.chat_id === chatIdString));
  }, [chatId, currentChats]);

  return (
    <>
      <Stack direction="row" sx={{ width: "100%", height: "100vh" }}>
        {!isMobile && (
          <Chats setDialogOpen={setDialogOpen} chats={currentChats} />
        )}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFF",
            borderBottom: chatId ? "0px" : "6px solid #0162C4",
          }}
        >
          {chatId && currentChat ? (
            <ChatWindow currentChat={currentChat} />
          ) : (
            <InitialScreen isDialogOpen={setDialogOpen} />
          )}
        </Box>
        <FormDialog
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          addNewChat={addNewChat}
        />
      </Stack>
    </>
  );
};

export default GeneralApp;
