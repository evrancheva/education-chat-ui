import { Stack } from "@mui/material";
import { useState } from "react";
import { Message } from "./types";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import getAnswer from "../../api/educationAPI/services/educationService";
import { Chat } from "../ChatList/types";
import { useEffect } from "react";

interface Props {
  currentChat: Chat;
}

const InitialHelloMessage: Message = {
  type: "msg",
  text: "Hi 👋🏻, how can I help you today?",
  incoming: true,
  outgoing: false,
};

// System instructions are instructions passed from our app instructing how OpenAI should behave
const SystemInstructions: string[] = [
  "You are a helpful chatbot. You respond completely in valid HTML. Please, return all the content within the <body> tags. If there is a formula, format it in Latex.",
];

const Conversation: Message[] = [];

const ChatWindow: React.FC<Props> = ({ currentChat }) => {
  // chatHistory array is used for displaying all the messages in the chat window
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  // Custom instructions are instructions passed from the creator of the chat instructing how OpenAI should behave
  const CustomInstructions =
    currentChat && currentChat.instructions ? [currentChat.instructions] : [];

  useEffect(() => {
    setChatHistory([InitialHelloMessage]);
  }, [currentChat]);

  async function getResponseToQuestion(
    Conversation: Message[]
  ): Promise<string | null> {
    let response: string | null;
    try {
      response = await getAnswer(
        SystemInstructions,
        CustomInstructions,
        Conversation
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
    const updatedHistory = [...chatHistory, question];
    setChatHistory(updatedHistory);

    Conversation.push(question);

    try {
      const response = await getResponseToQuestion(Conversation);

      if (response) {
        const answer: Message = {
          type: "msg",
          text: response,
          incoming: true,
          outgoing: false,
        };

        const updatedHistoryWithAnswer = [...updatedHistory, answer];
        setChatHistory(updatedHistoryWithAnswer);

        Conversation.push(answer);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
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

export default ChatWindow;
