import { Message } from "../../../components/Chat/types";
import { OpenAIMessage } from "../models/types";

export const map = (messages: Message[]): OpenAIMessage[] => {
  return messages.map((message) => ({
    role: message.incoming && !message.outgoing ? "assistant" : "user",
    content: message.text,
  }));
};
