import { Stack, Box } from "@mui/material";
import { ChatHeader, ChatFooter } from "../../components/Chat";
import { TextMsg } from "../../sections/dashboard/Conversation";
import { useState } from "react";
import { Message } from "../../components/types";
import { mapMessagesForOpenAI } from "../../utils/messageMapper";
import askQuestion from "../../api/educationServerless";

const Chat_History: Message[] = [
  {
    type: "msg",
    text: "Hi 👋🏻, how can I help you today?",
    incoming: true,
    outgoing: false,
  },
];

const Messages_For_OpenAI: Message[] = [
  {
    type: "msg",
    text: "If there is a formula in our chat please format it in Latex and don't mention the format type.",
    incoming: true,
    outgoing: false,
  },
];
const ChatComponent: React.FC = () => {
  const [items, setItems] = useState<Message[]>(Chat_History);

  const handleQuestion = async (q: string): Promise<void> => {
    if (!q) return;

    const question: Message = {
      type: "msg",
      text: q,
      incoming: false,
      outgoing: true,
    };

    // Show the question to the chat
    const newItems = [...items, question];
    setItems(newItems);

    // Add the questions to the array of messages for OPEN AI
    Messages_For_OpenAI.push(question);

    const mappedMessagesForOpenAI = mapMessagesForOpenAI(Messages_For_OpenAI);
    const apiResponse: string = await askQuestion(mappedMessagesForOpenAI);

    if (apiResponse) {
      const response: Message = {
        type: "msg",
        text: apiResponse,
        incoming: true,
        outgoing: false,
      };

      // Show the answer to the chat
      const newItems = [...items, question, response];
      setItems(newItems);
      // Add the questions to the array of messages for OPEN AI
      Messages_For_OpenAI.push(response);
    }
  };

  return (
    <Stack height={"100%"} maxHeight={"100vh"}>
      <Box
        width={"100%"}
        height={"100vh"}
        sx={{
          position: "relative",
          flexGrow: 1,
          overflow: "scroll",
          backgroundColor: "#F0F4FA",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <ChatHeader />
        <Box p={1}>
          <Stack spacing={3}>
            {items.map((el, idx) => {
              return <TextMsg key={idx} el={el} />;
            })}
          </Stack>
        </Box>
        <ChatFooter handleQuestion={handleQuestion} />
      </Box>
    </Stack>
  );
};

export default ChatComponent;
