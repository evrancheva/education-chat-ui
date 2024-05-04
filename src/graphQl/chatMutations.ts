import { gql } from "@apollo/client";

export const INSERT_CHAT_MUTATION = gql`
  mutation AddChat($chat: chats_insert_input!) {
    insert_chats_one(object: $chat) {
      id
      description
      instructions
      name
    }
  }
`;

export const DELETE_CHAT_MUTATION = gql`
  mutation DeleteChat($chatId: Int!) {
    delete_chats_by_pk(id: $chatId) {
      id
      description
      instructions
      name
    }
  }
`;
