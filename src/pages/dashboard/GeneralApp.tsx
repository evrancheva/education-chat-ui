import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import ChatComponent from "../../components/Chat/Conversation";
import Chats from "../../components/History/History";
import NoChat from "../../assets/Illustration/NoChat";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";

const GeneralApp: React.FC = () => {
  const theme = useTheme();
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
            borderBottom:
              searchParams.get("type") === "individual-chat" &&
              searchParams.get("id")
                ? "0px"
                : "6px solid #0162C4",
          }}
        >
          {searchParams.get("type") === "individual-chat" &&
          searchParams.get("id") ? (
            <ChatComponent />
          ) : (
            <Stack
              spacing={2}
              sx={{ width: "100%", height: "100vh" }}
              alignItems="center"
              justifyContent={"center"}
            >
              <NoChat />
              <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/app?id=0&type=individual-chat"
                >
                  new one
                </Link>
              </Typography>
            </Stack>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default GeneralApp;
