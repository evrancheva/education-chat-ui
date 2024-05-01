import { Message } from "../ChatWindow/types";

export type Chat = {
  _id: { $oid: string };
  chat_id: string;
  user_id: string;
  name: string;
  description: string;
  instructions: string;
  messages: Message[];
  time: string;
};
