import React from "react";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/Shared/Navigation/SideBar";
import useResponsive from "../../utils/useResponsive";

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
