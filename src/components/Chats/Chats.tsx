import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import useLocalStorage from "../../utils/useLocalStore";
import { ChatItem as ChatItemType } from "./types";
import { PlusCircle } from "phosphor-react";
import FormDialog from "./FormDialog";
import { useState } from "react";
import ChatItem from "./ChatItem";

const Chats: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const ChatItems: ChatItemType[] = [];

  const [storedChatItems, setStoredChatItems] = useLocalStorage(
    "ChatItems",
    ChatItems
  );

  const reloadItems = () => {
    const chatItems = localStorage.getItem("ChatItems");
    const currentChatItems: ChatItemType[] = chatItems
      ? JSON.parse(chatItems)
      : [];

    setStoredChatItems(currentChatItems);
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
          All Custom Chats
          <IconButton
            sx={{ width: "max-content", color: "#1976d2", ml: "auto" }}
            onClick={openDialog}
          >
            <PlusCircle />
          </IconButton>
          <FormDialog
            isOpen={isDialogOpen}
            isEdit={false}
            onClose={() => setIsDialogOpen(false)}
            reloadItems={reloadItems}
          />
        </Typography>
        <Box pr={2} sx={{ overflowY: "scroll", height: "100%" }}>
          {storedChatItems.map((el, idx) => {
            return <ChatItem key={idx} chatItem={el} />;
          })}
        </Box>
      </Stack>
    </Box>
  );
};

export default Chats;
