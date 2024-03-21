import { OpenAIMessage } from "../utils/types";
const EDUCATION_API_URL: string = import.meta.env.VITE_EDUCATION_URL || "";

const askQuestion = async (messages: OpenAIMessage[]): Promise<string> => {
  try {
    const url = `${EDUCATION_API_URL}/ask`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
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

export default askQuestion;
