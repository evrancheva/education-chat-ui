import { Stack, Box } from "@mui/material";
import { ChatHeader, ChatFooter } from "../../components/Chat";
import { TextMsg } from "../../sections/dashboard/Conversation";
import { useState } from "react";

const Chat_History: Message[] = [
  {
    type: "msg",
    message: "Hi 👋🏻, how can I help you today?",
    incoming: true,
    outgoing: false,
  },
];

interface Message {
  type: string;
  message: string;
  incoming: boolean;
  outgoing: boolean;
}

const ChatComponent: React.FC = () => {
  const [items, setItems] = useState<Message[]>(Chat_History);

  const handleQuestion = async (newData: string): Promise<void> => {
    if (!newData) return;

    const question: Message = {
      type: "msg",
      message: newData,
      incoming: false,
      outgoing: true,
    };

    const apiResponse = "sun";
    if (apiResponse) {
      const response: Message = {
        type: "msg",
        message: apiResponse,
        incoming: true,
        outgoing: false,
      };

      const newItems = [...items, question, response];
      setItems(newItems);
    }
  };

  return (
    <Stack height={"100%"} maxHeight={"100vh"}>
      <ChatHeader />
      <Box
        width={"100%"}
        sx={{
          position: "relative",
          flexGrow: 1,
          overflow: "scroll",
          backgroundColor: "#F0F4FA",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Box p={1}>
          <Stack spacing={3}>
            {items.map((el, idx) => {
              return <TextMsg key={idx} el={el} />;
            })}
          </Stack>
        </Box>
      </Box>
      <ChatFooter handleQuestion={handleQuestion} />
    </Stack>
  );
};

export default ChatComponent;
