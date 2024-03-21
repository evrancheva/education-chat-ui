import { Stack, Box } from "@mui/material";
import { ChatHeader, ChatFooter } from "../../components/Chat";
import { TextMsg } from "../../sections/dashboard/Conversation";
import { useState } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { Message } from "../../components/types";
import { mapMessagesForOpenAI } from "../../utils/messageMapper";
import askQuestion from "../../api/educationServerless";

const Chat_History: Message[] = [
  {
    type: "msg",
    text: "Hi 👋🏻, how can I help you today?",
    incoming: true,
    outgoing: false,
  },
];

const Messages_For_OpenAI: Message[] = [
  {
    type: "msg",
    text: "If there is a formula in our chat please format it in Latex",
    incoming: true,
    outgoing: false,
  },
];

const ChatComponent: React.FC = () => {
  const [items, setItems] = useState<Message[]>(Chat_History);

  const handleQuestion = async (q: string): Promise<void> => {
    if (!q) return;

    const question: Message = {
      type: "msg",
      text: q,
      incoming: false,
      outgoing: true,
    };

    // Show the question to the chat
    const newItems = [...items, question];
    setItems(newItems);

    // Add the questions to the array of messages for OPEN AI
    Messages_For_OpenAI.push(question);

    const mappedMessagesForOpenAI = mapMessagesForOpenAI(Messages_For_OpenAI);
    console.log(mappedMessagesForOpenAI);
    const apiResponse: string = await askQuestion(mappedMessagesForOpenAI);

    if (apiResponse) {
      const response: Message = {
        type: "msg",
        text: apiResponse,
        incoming: true,
        outgoing: false,
      };

      // Show the answer to the chat
      const newItems = [...items, question, response];
      setItems(newItems);
      // Add the questions to the array of messages for OPEN AI
      Messages_For_OpenAI.push(question);
    }
  };

  /*const textWithCurlyBraces = `The Navier-Stokes equation is a set of equations that describe the motion of fluid substances, taking into account both viscosity (the internal friction within the fluid) and pressure. The general form of the Navier-Stokes equation for an incompressible fluid is given by:

  \\[ \\frac{\\partial \\mathbf{v}}{\\partial t} + (\\mathbf{v} \\cdot \\nabla) \\mathbf{v} = -\\frac{1}{\\rho} \\nabla p + \\nu \\nabla^2 \\mathbf{v} \\]
  
  where:
  - \\( \\mathbf{v} \\) represents the velocity vector field of the fluid,
  - \\( t \\) is time,
  - \\( \\rho \\) is the fluid density,
  - \\( p \\) is the pressure,
  - \\( \\nu \\) is the kinematic viscosity of the fluid,
  - \\( \\nabla \\) represents the gradient operator,
  - \\( \\nabla^2 \\) represents the Laplacian operator.
  
  The Navier-Stokes equation is a fundamental equation in fluid dynamics and is used to model a wide range of phenomena, from weather patterns to ocean currents to airflow around aircraft.`;
*/
  return (
    <Stack height={"100%"} maxHeight={"100vh"}>
      <ChatHeader />
      <Box
        width={"100%"}
        sx={{
          position: "relative",
          flexGrow: 1,
          overflow: "scroll",
          backgroundColor: "#F0F4FA",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Box p={1}>
          <Stack spacing={3}>
            {/*
            <Stack direction="row" justifyContent="start" alignItems="center">
              <Box
                px={1.5}
                py={1.5}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 1.5,
                  maxWidth: "90%",
                  fontFamily: "Roboto",
                }}
              >
                 <Latex>{textWithCurlyBraces}</Latex> 
              </Box>
            </Stack>
            */}
            {items.map((el, idx) => {
              return <TextMsg key={idx} el={el} />;
            })}
          </Stack>
        </Box>
      </Box>
      <ChatFooter handleQuestion={handleQuestion} />
    </Stack>
  );
};

export default ChatComponent;
