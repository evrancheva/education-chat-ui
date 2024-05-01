import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import type { Chat } from "./types";
import { X } from "phosphor-react";
import useLocalStorage from "../../hooks/useLocalStore";
import { truncateText } from "../../utils/textUtils";
import { getTimeFromISOString } from "../../utils/timeUtils";

interface Props {
  chat: Chat;
  removeChat: (id: string) => void;
}

const ChatItem: React.FC<Props> = ({ chat, removeChat }) => {
  const [isAdmin] = useLocalStorage<boolean>("IsAdmin", true);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedChatId = searchParams.get("id") ?? "0";

  let isSelected = selectedChatId === chat.chat_id.toString();

  if (!selectedChatId) {
    isSelected = false;
  }

  const StyledChatBox = styled(Box)(() => ({
    "&:hover": {
      cursor: "pointer",
    },
  }));

  const deleteChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeChat(chat.chat_id);
    // By deleting the id param, we are opening the initial screen
    searchParams.delete("id");
    setSearchParams(searchParams);
  };

  return (
    <StyledChatBox
      onClick={() => {
        searchParams.set("id", chat.chat_id);
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
            {getTimeFromISOString(chat.time)}
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
