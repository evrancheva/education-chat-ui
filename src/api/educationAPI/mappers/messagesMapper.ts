import { Message } from "../../../components/Chat/types";
import { OpenAIMessage, Role } from "../models/types";

export const mapMessages = (messages: Message[]): OpenAIMessage[] => {
  return messages.map((message) => ({
    role: message.incoming && !message.outgoing ? Role.ASSISTANT : Role.USER,
    content: message.text,
  }));
};
