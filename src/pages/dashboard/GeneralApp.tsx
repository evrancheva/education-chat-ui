import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import useResponsive from "../../hooks/useResponsive";
import Chats from "../../components/ChatList/ChatList";
import MobileNav from "../../components/Shared/Navigation/MobileNav";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import InitialScreen from "../../components/ChatWindow/InitialScreen";
import FormDialog from "../../components/Shared/Chat/FormDialog";
import LoadingScreen from "../../components/Shared/LoadingScreen";
import ErrorPage from "../../components/Shared/Error";
import { INSERT_CHAT_MUTATION } from "../../graphQl/chatMutations";
import { GET_CHATS_BY_USER_ID } from "../../graphQl/chatQueries";
import { Chat } from "../../components/ChatList/types";

const userId = 1;

const GeneralApp: React.FC = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentChats, updateCurrentChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | undefined>();

  const { loading, error, data } = useQuery(GET_CHATS_BY_USER_ID, {
    variables: { userId },
  });

  const [insertChat] = useMutation(INSERT_CHAT_MUTATION);

  useEffect(() => {
    if (!loading && data?.chats) {
      updateCurrentChats(data.chats);
    }
  }, [data, loading]);

  useEffect(() => {
    if (searchParams.get("id") !== null) {
      const chat_id = parseInt(searchParams.get("id")!);
      setCurrentChat(currentChats.find((chat) => chat.id === chat_id));
    }
  }, [searchParams, currentChats]);

  const addChatToDb = async (chat: Chat) => {
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
      return data?.insert_chats_one ?? null;
    } catch (error) {
      console.error("Error adding chat:", error);
      return null;
    }
  };

  const handleNewChat = async (newChat: Chat) => {
    isMobile && setIsDrawerOpen(false);

    const chat = await addChatToDb(newChat);
    setCurrentChat(chat);

    searchParams.set("id", chat.id.toString());
    setSearchParams(searchParams);
  };

  const setDialogOpen = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
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
      <Box sx={{ width: "100%", backgroundColor: "#FFF" }}>
        {searchParams.get("id") ? (
          <ChatWindow currentChat={currentChat} />
        ) : (
          <InitialScreen isDialogOpen={setDialogOpen} />
        )}
      </Box>
      <FormDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        addNewChat={handleNewChat}
      />
    </Stack>
  );
};

export default GeneralApp;
