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
import { INSERT_CHAT_MUTATION } from "../../graphQl/chatMutations";
import { useQuery, useMutation } from "@apollo/client";
import MobileNav from "../../components/Shared/Navigation/MobileNav";

const userId: number = 1;

const GeneralApp: React.FC = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [insertChat] = useMutation(INSERT_CHAT_MUTATION);
  const { loading, error, data } = useQuery(GET_CHATS_BY_USER_ID, {
    variables: { userId },
  });

  // Used for showing the chats in the bar
  const [currentChats, updateCurrentChats] = useState<Chat[]>([]);

  // Used for opening the right chat when a new chat is added or selected
  const [currentChat, setCurrentChat] = useState<Chat | undefined>();

  const addNewChat = async (newChat: Chat) => {
    const chat = await addChatToDb(newChat);
    searchParams.set("id", chat.id.toString());
    setSearchParams(searchParams);

    isMobile ? setIsDrawerOpen(false) : null;
  };

  const addChatToDb = async (chat: Chat): Promise<Chat> => {
    try {
      const { data } = await insertChat({
        variables: {
          chat: {
            user_id: userId,
            name: chat.name,
            description: chat.description,
            instructions: chat.instructions,
          },
        },
        refetchQueries: [
          { query: GET_CHATS_BY_USER_ID, variables: { userId } },
        ],
      });

      const chatId = data?.insert_chats_one ?? null;
      return chatId;
    } catch (error) {
      console.error("Error adding chat:", error);
      return null;
    }
  };

  const setDialogOpen = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
  };

  useEffect(() => {
    if (!loading && data && data.chats) {
      updateCurrentChats(data.chats);
      const chatId = parseInt(searchParams.get("id"));
      setCurrentChat(data.chats.find((chat: Chat) => chat.id === chatId));
    }
  }, [data, searchParams]);

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
        {!isMobile ? (
          <Chats setDialogOpen={setDialogOpen} chats={currentChats} />
        ) : (
          <MobileNav
            setDialogOpen={setDialogOpen}
            chats={currentChats}
            isDrawerOpen={isDrawerOpen}
          />
        )}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFF",
          }}
        >
          {currentChat ? (
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
