import { Message } from "../../../components/ChatWindow/types";
import { OpenAIMessage, Role } from "../types";

export const mapMessages = (messages: Message[]): OpenAIMessage[] => {
  return messages.map((message) => ({
    role: message.incoming && !message.outgoing ? Role.ASSISTANT : Role.USER,
    content: message.text,
  }));
};
