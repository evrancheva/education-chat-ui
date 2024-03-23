const EDUCATION_API_URL: string = import.meta.env.VITE_EDUCATION_URL || "";
import { Message } from "../../components/Chat/types";
import { map } from "./mappers/messageMapper";
import { OpenAIMessage } from "./models/types";

const getAnswer = async (incomingMessages: Message[]): Promise<string> => {
  try {
    const history: OpenAIMessage[] = map(incomingMessages);
    const url = `${EDUCATION_API_URL}/ask`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(history),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data, status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getAnswer;
