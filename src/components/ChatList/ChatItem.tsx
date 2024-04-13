import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import type { Chat } from "./types";
import { X } from "phosphor-react";
import useLocalStorage from "../../hooks/useLocalStore";
import { truncateText } from "../../utils/textUtils";

interface Props {
  chat: Chat;
  removeChat: (id: number) => void;
}

const ChatItem: React.FC<Props> = ({ chat, removeChat }) => {
  const [isAdmin] = useLocalStorage<boolean>("IsAdmin", false);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedChatId = searchParams.get("id") ?? "0";

  let isSelected = +selectedChatId === chat.id;

  if (!selectedChatId) {
    isSelected = false;
  }

  const StyledChatBox = styled(Box)(() => ({
    "&:hover": {
      cursor: "pointer",
    },
  }));

  const deleteChat = () => {
    removeChat(chat.id);
  };

  return (
    <StyledChatBox
      onClick={() => {
        searchParams.set("id", chat.id.toString());
        setSearchParams(searchParams);
      }}
      sx={{
        borderRadius: 1,
        backgroundColor: isSelected ? "#1976d280" : "#fff",
        mb: 2,
      }}
      p={2}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">
              {truncateText(chat.name, 20)}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {chat.time}
            {isAdmin ? (
              <IconButton
                sx={{
                  color: "#1976d2",
                  ml: 1,
                }}
                onClick={deleteChat}
              >
                <X size={16} />
              </IconButton>
            ) : null}
          </Typography>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export default ChatItem;
