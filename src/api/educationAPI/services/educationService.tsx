import { Message } from "../../../components/Chat/types";
import { mapInstructions } from "../mappers/instructionsMapper";
import { mapMessages } from "../mappers/messagesMapper";
import getPostData from "../../common/apiService";

const EDUCATION_API_URL: string = import.meta.env.VITE_EDUCATION_API_URL || "";

const getAnswer = async (
  passedInstructions: string[],
  messageHistory: Message[]
): Promise<string> => {
  const instructions = mapInstructions(passedInstructions);
  const messages = mapMessages(messageHistory);
  const context = instructions.concat(messages);

  const endpoint = `${EDUCATION_API_URL}/ask`;
  const body = JSON.stringify(context);

  const answer = getPostData(endpoint, body);
  return answer;
};

export default getAnswer;
