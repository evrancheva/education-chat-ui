import React from "react";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/Shared/SideBar";
import useResponsive from "../../hooks/useResponsive";

const DashboardLayout: React.FC = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
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
