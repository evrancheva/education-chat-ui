import { gql } from "@apollo/client";

export const GET_CHATS_BY_USER_ID = gql`
  query GetChatsByUserId($userId: string) {
    Chats(where: { user_id: { _eq: $userId } }) {
      _id
      chat_id
      user_id
      name
      description
      instructions
      time
    }
  }
`;
