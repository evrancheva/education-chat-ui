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
import { GET_CHATS_BY_USER_ID } from "../../graphQl/chatQueries";
import { useQuery } from "@apollo/client";

const userId: string = "a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5";

const GeneralApp: React.FC = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const [searchParams] = useSearchParams();
  const chatIdString = searchParams.get("id");
  const chatId = chatIdString ? parseInt(chatIdString) : null;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_CHATS_BY_USER_ID, {
    variables: { userId },
  });

  // Used for showing the chats in the bar
  const [currentChats, updateCurrentChats] = useState<Chat[]>([]);

  // Used for opening the right chat when a new chat is added or selected
  const [currentChat, setCurrentChat] = useState<Chat | undefined>();

  // On adding a new chat, we need to add it to the history bar
  const addNewChat = (newChat: Chat) => {
    // TO DO: Add it also to the grapQL
    updateCurrentChats([newChat, ...currentChats]);
  };

  const setDialogOpen = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
  };

  // This makes sure that the right chat is displayed on update of id search param
  useEffect(() => {
    if (!loading && data) {
      updateCurrentChats(data.Chats);
    }
    setCurrentChat(currentChats.find((chat) => chat.chat_id === chatIdString));
  }, [loading, data, chatIdString, currentChats]);

  // TO DO: Improve that
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

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
