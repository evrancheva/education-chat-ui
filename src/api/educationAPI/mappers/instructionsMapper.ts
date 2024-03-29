import { OpenAIMessage, Role } from "../types";

export const mapInstructions = (messages: string[]): OpenAIMessage[] => {
  return messages.map((message) => ({
    role: Role.SYSTEM,
    content: message,
  }));
};
