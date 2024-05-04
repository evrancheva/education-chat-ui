import { gql } from "@apollo/client";

export const GET_CHATS_BY_USER_ID = gql`
  query GetChatsByUserId($userId: Int) {
    chats(where: { user_id: { _eq: $userId } }, order_by: { createdAt: desc }) {
      id
      user_id
      description
      instructions
      name
      createdAt
    }
  }
`;
