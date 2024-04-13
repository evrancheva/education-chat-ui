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

// We use the next array to pass SystemDefinedChatIntructions to OPENAI
const SystemDefinedChatIntructions: string[] = [
  "You are a helpful chatbot. You respond completely in valid HTML. Please, return all the content within the <body> tags. If there is a formula, format it in Latex.",
];
let ConversationContext: Message[] = [];

const InitialHelloMessage: Message = {
  type: "msg",
  text: "Hi 👋🏻, how can I help you today?",
  incoming: true,
  outgoing: false,
};

const Conversation: React.FC<Props> = ({ currentChat }) => {
  ConversationContext = [];
  // chatHistory array is used for displaying all the messages in the chat
  const [chatHistory, setChatHistory] = useState<Message[]>([
    InitialHelloMessage,
  ]);

  const userDefinedChatInstructions =
    currentChat && currentChat.instructions ? [currentChat.instructions] : [];

  useEffect(() => {
    ConversationContext = [];
    setChatHistory([InitialHelloMessage]);
  }, [currentChat]);

  async function getResponseToQuestion(
    ConversationContext: Message[]
  ): Promise<string | null> {
    let response: string | null;
    try {
      response = await getAnswer(
        SystemDefinedChatIntructions,
        userDefinedChatInstructions,
        ConversationContext
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

    // Add the question to the ConversationContext that is passed to OPEN AI
    ConversationContext.push(question);

    try {
      const response = await getResponseToQuestion(ConversationContext);

      if (response) {
        const answer: Message = {
          type: "msg",
          text: response,
          incoming: true,
          outgoing: false,
        };

        const updatedHistoryWithAnswer = [...updatedHistory, answer];
        setChatHistory(updatedHistoryWithAnswer);

        ConversationContext.push(answer);
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

export default Conversation;
