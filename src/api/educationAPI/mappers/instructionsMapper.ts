import { OpenAIMessage, Role } from "../models/types";

export const mapInstructions = (messages: string[]): OpenAIMessage[] => {
  return messages.map((message) => ({
    role: Role.SYSTEM,
    content: message,
  }));
};
