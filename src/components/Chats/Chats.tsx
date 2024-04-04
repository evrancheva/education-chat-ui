import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import useLocalStorage from "../../utils/useLocalStore";
import { ChatItem as ChatItemType } from "./types";
import { PlusCircle } from "phosphor-react";
import FormModal from "./FormDialog";
import { useState } from "react";
import ChatItem from "./ChatItem";
import { useSearchParams } from "react-router-dom";

const Chats: React.FC = () => {
  const ChatItems: ChatItemType[] = [];

  function getCurrentTime(): string {
    const now = new Date();

    return now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const [storedChatItems, setStoredChatItems] = useLocalStorage(
    "ChatItems",
    ChatItems
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const addNewChatItem = (formData: FormData): void => {
    const id = 17;
    const newChatItem: ChatItemType = {
      id: id,
      name: formData.get("name")?.toString(),
      description: formData.get("description")?.toString(),
      instructions: formData.get("instructions")?.toString(),
      time: getCurrentTime(),
    };

    // Retrieve the existing history items from local storage
    const updatedChatItems = [newChatItem, ...storedChatItems];

    // Update the local storage with the new array including the new chat item
    setStoredChatItems(updatedChatItems);

    searchParams.set("id", id.toString());
    setSearchParams(searchParams);
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
          <FormModal
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            addNewChatItem={addNewChatItem}
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
