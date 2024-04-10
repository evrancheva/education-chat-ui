import { ChatItem } from "../components/Chats/types";

// Currently we don't have a real db, so we are using localStorage
export function getAllChats(): ChatItem[] {
  const localStorageData: string | null = localStorage.getItem("ChatItems");
  let parsedData: ChatItem[] = [];

  try {
    if (localStorageData) {
      parsedData = JSON.parse(localStorageData);
    }
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
  }

  return parsedData || [];
}

export function getChatById(id: number): ChatItem | undefined {
  const allChats = getAllChats();
  const result = allChats.find((chat) => chat.id === id);
  return result;
}
