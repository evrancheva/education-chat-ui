import React from "react";
import { Box, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ChatComponent from "../../components/Chat/Conversation";
import Chats from "../../components/Chats/Chats";
import useResponsive from "../../utils/useResponsive";
import InitialScreen from "../../components/Chat/InitialScreen";
import FormDialog from "../../components/Shared/Chat/FormDialog";
import { useState } from "react";
import { ChatItem } from "../../components/Chats/types";
import useLocalStorage from "../../utils/useLocalStore";
import { getAllChats, getChatById } from "../../data/chatRepository";

const GeneralApp: React.FC = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  //const [currentChat, setCurrentChat] = useState<ChatItem | null>(null);

  const isDialogOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const ChatItems: ChatItem[] = [];

  const [storedChatItems, setStoredChatItems] = useLocalStorage(
    "ChatItems",
    ChatItems
  );

  const reloadItems = () => {
    const chatItems = getAllChats();
    setStoredChatItems(chatItems);
  };

  const refreshChat = (id: number) => {
    const chat = getChatById(id) ?? null;
    //setCurrentChat(chat);
  };

  return (
    <>
      <Stack direction="row" sx={{ width: "100%", height: "100vh" }}>
        {!isMobile && (
          <Chats isDialogOpen={isDialogOpen} chats={storedChatItems} />
        )}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFF",
            borderBottom: searchParams.get("id") ? "0px" : "6px solid #0162C4",
          }}
        >
          {searchParams.get("id") ? (
            <ChatComponent />
          ) : (
            <InitialScreen isDialogOpen={isDialogOpen} />
          )}
        </Box>
        <FormDialog
          isOpen={isOpen}
          isEdit={false}
          onClose={() => setIsOpen(false)}
          reloadItems={reloadItems}
          refreshChat={refreshChat}
        />
      </Stack>
    </>
  );
};

export default GeneralApp;
