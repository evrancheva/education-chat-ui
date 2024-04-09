import { Message } from "../../../components/Chat/types";
import { mapInstructions } from "../mappers/instructionsMapper";
import { mapMessages } from "../mappers/messagesMapper";
import getPostData from "../../common/apiService";

const EDUCATION_API_URL: string = import.meta.env.VITE_EDUCATION_API_URL || "";

const getAnswer = async (
  SystemInstructions: string[],
  AdminDefinedInstructions: string[],
  messageHistory: Message[]
): Promise<string> => {
  try {
    const systemInstructions = mapInstructions(SystemInstructions);
    const adminInstructions = mapInstructions(AdminDefinedInstructions);
    const messages = mapMessages(messageHistory);
    const context = [...systemInstructions, ...adminInstructions, ...messages];

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
