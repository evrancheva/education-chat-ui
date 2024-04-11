import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/Chat/Conversation";
import Chats from "../../components/Chats/Chats";
import useResponsive from "../../hooks/useResponsive";
import InitialScreen from "../../components/Chat/InitialScreen";
import FormDialog from "../../components/Shared/Chat/FormDialog";
import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStore";
import { ChatItem } from "../../components/Chats/types";
import { getAllChats } from "../../database/chatRepository";
import { useSearchParams } from "react-router-dom";

const GeneralApp: React.FC = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const [searchParams] = useSearchParams();
  const chatIdString = searchParams.get("id");

  const [chatId, setChatId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentChats, setCurrentChats] = useState(getAllChats());

  useEffect(() => {
    const id = chatIdString ? parseInt(chatIdString) : 0;
    setChatId(id);
  }, [chatIdString]);

  const [storedChatItems, setStoredChatItems] = useLocalStorage(
    "ChatItems",
    getAllChats()
  );

  const reloadChats = (newChat: ChatItem) => {
    setStoredChatItems([newChat, ...storedChatItems]);

    setCurrentChats([newChat, ...currentChats]);

    setChatId(newChat.id);
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
            borderBottom: searchParams.get("id") ? "0px" : "6px solid #0162C4",
          }}
        >
          {searchParams.get("id") ? (
            <Conversation id={chatId} />
          ) : (
            <InitialScreen isDialogOpen={isDialogOpen} />
          )}
        </Box>
        <FormDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          reloadChats={reloadChats}
        />
      </Stack>
    </>
  );
};

export default GeneralApp;
