import { Box, Stack } from "@mui/system";
import { Message as MessageComponent } from "./Message";
import { Message } from "./types";

interface ContentProps {
  messages: Message[];
}

const Content: React.FC<ContentProps> = ({ messages }) => {
  return (
    <Box
      sx={{
        position: "relative",
        flexGrow: 1,
        overflow: "scroll",
        backgroundColor: "#F0F4FA",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box p={1} flex="1">
        <Stack spacing={3}>
          {messages.map((el, idx) => {
            return <MessageComponent key={idx} el={el} />;
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default Content;
