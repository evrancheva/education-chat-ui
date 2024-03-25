import { Stack } from "@mui/material";
import { useState } from "react";
import { Message } from "./types";
import getAnswer from "../../api/educationAPI/educationAPI";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

// We use the next array to pass instructions to OPENAI, as well as the context of the information
const Context: Message[] = [
  {
    type: "msg",
    // Without this we won't be able to display the formulas nicely
    text: "If there is a formula in our chat please format it in Latex and don't mention the format type.",
    incoming: true,
    outgoing: false,
  },
];

const ChatComponent: React.FC = () => {
  // chatHistory array is used for displaying all the messages in the chat
  const [chatHistory, setChatHistory] = useState<Message[]>([
    // Initial hello message that is displayed when entering the chat
    {
      type: "msg",
      text: "Hi 👋🏻, how can I help you today?",
      incoming: true,
      outgoing: false,
    },
  ]);

  // Function to add a message to Context
  const addToContext = (message: Message): void => {
    Context.push(message);
  };

  // Function to handle the question
  const handleQuestion = async (q: string): Promise<void> => {
    if (!q) return;

    const question: Message = {
      type: "msg",
      text: q,
      incoming: false,
      outgoing: true,
    };

    // Show the question to the chat
    setChatHistory([...chatHistory, question]);

    // Add the question to the context that is passed to OPEN AI
    addToContext(question);

    const response: string = await getAnswer(Context);

    if (response) {
      const answer: Message = {
        type: "msg",
        text: response,
        incoming: true,
        outgoing: false,
      };

      // Show the question to the chat
      setChatHistory([...chatHistory, question, answer]);

      // Add the answer to the context that is passed to OPEN AI
      addToContext(answer);
    }
  };

  return (
    <Stack height={"100vh"} direction="column" display="flex">
      <Header />
      <Content chatHistory={chatHistory} />
      <Footer handleQuestion={handleQuestion} />
    </Stack>
  );
};

export default ChatComponent;
