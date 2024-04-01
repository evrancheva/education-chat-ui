import { Stack } from "@mui/material";
import { useState } from "react";
import { Message } from "./types";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import getAnswer from "../../api/educationAPI/services/educationService";

// We use the next array to pass instructions to OPENAI
const Instructions: string[] = [
  "You respond completely in valid HTML. Return all the content within the <body> tags. If there is a formula, format it in Latex.",
];

const Context: Message[] = [];

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

    const response: string = await getAnswer(Instructions, Context);

    if (response) {
      const answer: Message = {
        type: "msg",
        text: response,
        incoming: true,
        outgoing: false,
      };
      console.log(response);
      // Show the question to the chat
      setChatHistory([...chatHistory, question, answer]);

      // Add the answer to the context that is passed to OPEN AI
      addToContext(answer);
    }
  };

  return (
    <Stack height={"100vh"}>
      <Header />
      <Content chatHistory={chatHistory} />
      <Footer handleQuestion={handleQuestion} />
    </Stack>
  );
};

export default ChatComponent;
