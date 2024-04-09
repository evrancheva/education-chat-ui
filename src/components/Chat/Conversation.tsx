import { Stack } from "@mui/material";
import { useState } from "react";
import { Message } from "./types";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import getAnswer from "../../api/educationAPI/services/educationService";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getChatById } from "../../database/chatRepository";

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

const Context: Message[] = [];

const ChatComponent: React.FC = () => {
  // chatHistory array is used for displaying all the messages in the chat
  let AdminDefinedInstructions: string[] = [];

  const [chatHistory, setChatHistory] = useState<Message[]>([
    InitialHelloMessage,
  ]);

  const reseChat = () => {
    setChatHistory([InitialHelloMessage]);
  };

  const [searchParams] = useSearchParams(); // Get the search parameters
  const chatId = parseInt(searchParams.get("id") ?? "0");

  const [searchKey, setSearchKey] = useState<number | null>(chatId);

  useEffect(() => {
    console.log(searchKey);
    reseChat();
    const currentChat = getChatById(chatId);
    if (currentChat && currentChat.instructions) {
      AdminDefinedInstructions = [];
      AdminDefinedInstructions.push(currentChat.instructions);
    }
  }, [searchKey]);

  // Function to add a message to Context
  const addToContext = (message: Message): void => {
    Context.push(message);
  };

  async function getResponseToQuestion(
    SystemInstructions: string[],
    AdminDefinedInstructions: string[],
    Context: Message[]
  ): Promise<string | null> {
    let response: string | null;
    try {
      response = await getAnswer(
        SystemInstructions,
        AdminDefinedInstructions,
        Context
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
    addToContext(question);

    const response = await getResponseToQuestion(
      SystemInstructions,
      AdminDefinedInstructions,
      Context
    );

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
    <Stack height={"100vh"}>
      <Header />
      <Content chatHistory={chatHistory} />
      <Footer handleQuestion={handleQuestion} />
    </Stack>
  );
};

export default ChatComponent;
