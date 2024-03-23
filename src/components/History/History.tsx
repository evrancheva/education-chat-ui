import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import { faker } from "@faker-js/faker";

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: "Math lessons",
    time: "9:36",
    unread: 0,
    pinned: true,
    online: true,
  },
];

const truncateText = (string: string, n: number): string => {
  return string.length > n ? `${string.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(() => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

interface Props {
  time: string;
  id: number;
  msg: string;
}

const ChatElement: React.FC<Props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedChatId = searchParams.get("id") ?? "0";

  let isSelected = +selectedChatId === props.id;

  if (!selectedChatId) {
    isSelected = false;
  }

  const theme = useTheme();

  return (
    <StyledChatBox
      onClick={() => {
        searchParams.set("id", props.id.toString());
        searchParams.set("type", "individual-chat");
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
              {truncateText(props.msg, 20)}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {props.time}
          </Typography>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const Chats: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minWidth: 300,
        backgroundColor: "#F8FAFF",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        ></Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <Stack sx={{ flexGrow: 1, height: "100vh" }} pl={2}>
            <Typography variant="h5" sx={{ color: "#676667" }} mb={2} pt={3}>
              History
            </Typography>
            <Box pr={2} sx={{ overflow: "scroll", height: "100%" }}>
              {ChatList.map((el, idx) => {
                return <ChatElement key={idx} {...el} />;
              })}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
