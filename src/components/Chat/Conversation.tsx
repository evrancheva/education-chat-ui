import { Stack } from "@mui/material";
import { useState } from "react";
import { Message } from "./types";
import getAnswer from "../../api/educationAPI/educationAPI";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

const History: Message[] = [
  {
    type: "msg",
    text: "If there is a formula in our chat please format it in Latex and don't mention the format type.",
    incoming: true,
    outgoing: false,
  },
];
const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    // Initial hello message
    {
      type: "msg",
      text: "Hi 👋🏻, how can I help you today?",
      incoming: true,
      outgoing: false,
    },
  ]);

  const handleQuestion = async (q: string): Promise<void> => {
    if (!q) return;

    const question: Message = {
      type: "msg",
      text: q,
      incoming: false,
      outgoing: true,
    };

    // Show the question to the chat
    const newMessages = [...messages, question];
    setMessages(newMessages);

    // Add the questions to the array of messages for OPEN AI
    History.push(question);

    const response: string = await getAnswer(History);

    if (response) {
      const answer: Message = {
        type: "msg",
        text: response,
        incoming: true,
        outgoing: false,
      };

      // Show the answer to the chat
      const newMessages = [...messages, question, answer];
      setMessages(newMessages);
      // Add the questions to the array of messages for OPEN AI
      History.push(answer);
    }
  };

  return (
    <Stack height={"100vh"} direction="column" display="flex">
      <Header />
      <Content messages={messages} />
      <Footer handleQuestion={handleQuestion} />
    </Stack>
  );
};

export default ChatComponent;
