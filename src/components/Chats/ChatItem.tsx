import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import { ChatItem as ChatItemType } from "./types";
import { X } from "phosphor-react";
import useLocalStorage from "../../hooks/useLocalStore";

interface Props {
  chatItem: ChatItemType;
  removeChat: (id: number) => void;
}

const ChatItem: React.FC<Props> = ({ chatItem, removeChat }) => {
  const [isAdmin] = useLocalStorage<boolean>("IsAdmin", false);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedHistoryElementId = searchParams.get("id") ?? "0";

  let isSelected = +selectedHistoryElementId === chatItem.id;

  if (!selectedHistoryElementId) {
    isSelected = false;
  }

  const theme = useTheme();

  const truncateText = (string: string, n: number): string => {
    return string.length > n ? `${string.slice(0, n)}...` : string;
  };

  const StyledHistoryElementBox = styled(Box)(() => ({
    "&:hover": {
      cursor: "pointer",
    },
  }));

  const deleteChat = () => {
    removeChat(chatItem.id);
  };

  return (
    <StyledHistoryElementBox
      onClick={() => {
        searchParams.set("id", chatItem.id.toString());
        setSearchParams(searchParams);
      }}
      sx={{
        borderRadius: 1,
        backgroundColor: isSelected
          ? alpha(theme.palette.primary.main, 0.5)
          : "#fff",
        mb: 2,
      }}
      p={2}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">
              {truncateText(chatItem.name, 20)}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {chatItem.time}

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
    </StyledHistoryElementBox>
  );
};

export default ChatItem;
