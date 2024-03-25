import { Box, Stack } from "@mui/system";
import { Message as MessageComponent } from "./Message";
import { Message } from "./types";
import React, { useEffect, useRef } from "react";
interface ContentProps {
  chatHistory: Message[];
}

const Content: React.FC<ContentProps> = ({ chatHistory }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "scroll",
        backgroundColor: "#F0F4FA",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack p={2} spacing={3}>
        {chatHistory.map((el, idx) => {
          return <MessageComponent key={idx} el={el} />;
        })}
      </Stack>
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default Content;
