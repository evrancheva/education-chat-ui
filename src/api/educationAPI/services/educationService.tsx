import { mapInstructions } from "../mappers/instructionsMapper";
import { mapMessages } from "../mappers/messagesMapper";
import getPostData from "../../common/apiService";
import { Message } from "../../../components/ChatWindow/types";

const EDUCATION_API_URL: string = import.meta.env.VITE_EDUCATION_API_URL || "";

const getAnswer = async (
  allSystemInstructions: string,
  conversation: Message[]
): Promise<string> => {
  try {
    const mappedSystemInstructions = mapInstructions(allSystemInstructions);
    const messages = mapMessages(conversation);
    const context = [mappedSystemInstructions, ...messages];

    const endpoint = `${EDUCATION_API_URL}/ask`;
    const body = JSON.stringify(context);

    const answer = getPostData(endpoint, body);
    return answer;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export default getAnswer;
