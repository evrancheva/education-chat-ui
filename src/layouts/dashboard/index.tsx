import React from "react";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import useMediaQuery from "@mui/material/useMediaQuery";

const DashboardLayout: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Stack direction="row">
        {!isMobile && <SideBar />}
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
