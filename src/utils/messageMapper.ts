import { Message } from "../components/types";
import { OpenAIMessage } from "./types";

export const mapMessagesForOpenAI = (messages: Message[]): OpenAIMessage[] => {
  return messages.map((message) => ({
    role: message.incoming && !message.outgoing ? "assistant" : "user",
    content: message.text,
  }));
};
