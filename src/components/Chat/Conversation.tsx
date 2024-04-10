import { Stack } from "@mui/material";
import { useState } from "react";
import { Message } from "./types";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import getAnswer from "../../api/educationAPI/services/educationService";
import { useEffect } from "react";
import { getChatById } from "../../database/chatRepository";

interface Props {
  id: number;
}

// We use the next array to pass SystemInstructions to OPENAI
const SystemInstructions: string[] = [
  "You are a helpful chatbot. You respond completely in valid HTML. Please, return all the content within the <body> tags. If there is a formula, format it in Latex.",
];

const InitialHelloMessage: Message = {
  type: "msg",
  text: "Hi 👋🏻, how can I help you today?",
  incoming: true,
  outgoing: false,
};

const Conversation: React.FC<Props> = ({ id }) => {
  // chatHistory array is used for displaying all the messages in the chat
  const [chatHistory, setChatHistory] = useState<Message[]>([
    InitialHelloMessage,
  ]);

  const [context, setContext] = useState<Message[]>([]);

  const [adminInstructions, setAdminInstructions] = useState<string[]>([]);

  useEffect(() => {
    console.log("reloaded", id);
    setChatHistory([InitialHelloMessage]);
    setContext([]);
    setAdminInstructions([]);

    const currentChat = getChatById(id);
    if (currentChat && currentChat.instructions) {
      setAdminInstructions([currentChat.instructions]);
    }
  }, [id]);

  async function getResponseToQuestion(): Promise<string | null> {
    let response: string | null;
    try {
      console.log("adminInstructions", adminInstructions);
      response = await getAnswer(
        SystemInstructions,
        adminInstructions,
        context ?? []
      );
    } catch (error) {
      console.error("An error occurred:", error);
      response = null;
    }
    return response;
  }

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
    setContext([...context, question]);

    const response = await getResponseToQuestion();

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
      setContext([...context, question, answer]);
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

export default Conversation;
