import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

// components
import LoadingScreen from "../components/LoadingScreen";

// config
import { DEFAULT_PATH } from "../config";

// Lazy loading higher-order component
const Loadable =
  (Component: React.ComponentType<any>) =>
  (props: React.ComponentProps<typeof Component>) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

// GeneralApp component
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);

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
