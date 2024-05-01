import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { PlusCircle } from "phosphor-react";
import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStore";
import { useEffect } from "react";
import ChatItem from "./ChatItem";
import type { Chat } from "./types";
import { GET_CHATS_BY_USER_ID } from "../../graphQl/chatQueries";
import { useQuery } from "@apollo/client";

interface Props {
  setDialogOpen: (isOpen: boolean) => void;
  chats: Chat[];
}

const userId: string = "a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5";

const Chats: React.FC<Props> = ({ setDialogOpen, chats }) => {
  const { loading, error, data } = useQuery(GET_CHATS_BY_USER_ID, {
    variables: { userId },
  });

  const [isAdmin] = useLocalStorage<boolean>("IsAdmin", true);
  const [currentChats, setCurrentChats] = useState([]);

  // Update currentChats only when loading is false
  useEffect(() => {
    if (!loading && data) {
      setCurrentChats(data.Chats);
    }
  }, [loading, data]);

  const removeChat = (id: string) => {
    const updatedChatItems = currentChats.filter((chat) => chat.chat_id !== id);
    // Remove it from the chat bar
    setCurrentChats(updatedChatItems);

    // Remove it from localStorage
  };

  // TO DO: Improve that
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

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
          {data.Chats.map((el, idx) => {
            return <ChatItem key={idx} chat={el} removeChat={removeChat} />;
          })}
        </Box>
      </Stack>
    </Box>
  );
};

export default Chats;
