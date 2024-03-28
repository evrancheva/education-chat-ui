import { Message } from "../../../components/Chat/types";
import { mapInstructions } from "../mappers/instructionsMapper";
import { mapMessages } from "../mappers/messagesMapper";
import fetchAnswer from "../infrastructure/educationAPI";

const getAnswer = async (
  passedInstructions: string[],
  messageHistory: Message[]
): Promise<string> => {
  const instructions = mapInstructions(passedInstructions);
  const messages = mapMessages(messageHistory);
  const context = instructions.concat(messages);

  return fetchAnswer(context);
};

export default getAnswer;
