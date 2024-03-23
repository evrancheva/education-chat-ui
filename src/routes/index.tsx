import { Navigate, useRoutes } from "react-router-dom";
import GeneralApp from "../pages/dashboard/GeneralApp";
import DashboardLayout from "../layouts/dashboard";
import { DEFAULT_PATH } from "../config";

// Define the routes
export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
