export type Chat = {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  instructions: string;
  createdAt: string;
};

// For DB
export type ChatModel = {
  user_id: number;
  name: string;
  description?: string;
  instructions: string;
};
