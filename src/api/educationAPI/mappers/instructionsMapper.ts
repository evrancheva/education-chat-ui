import { OpenAIMessage, Role } from "../types";

export const mapInstructions = (instructions: string): OpenAIMessage => {
  const systemInstructions: OpenAIMessage = {
    role: Role.SYSTEM,
    content: instructions,
  };

  return systemInstructions;
};
