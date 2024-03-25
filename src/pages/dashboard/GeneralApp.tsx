import React from "react";
import { Box, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ChatComponent from "../../components/Chat/Conversation";
import Chats from "../../components/History/History";
import useResponsive from "../../utils/useResponsive";
import InitialScreen from "../../components/Chat/InitialScreen";

const GeneralApp: React.FC = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");

  const [searchParams] = useSearchParams();

  return (
    <>
      <Stack direction="row" sx={{ width: "100%", height: "100vh" }}>
        {!isMobile && <Chats />}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFF",
            borderBottom: searchParams.get("id") ? "0px" : "6px solid #0162C4",
          }}
        >
          {searchParams.get("id") ? <ChatComponent /> : <InitialScreen />}
        </Box>
      </Stack>
    </>
  );
};

export default GeneralApp;
