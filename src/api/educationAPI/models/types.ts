export type OpenAIMessage = {
  role: string;
  content: string;
};

export enum Role {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant",
}
