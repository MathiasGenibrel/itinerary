import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import Register from "./register/page.tsx";
import Login from "./login/page.tsx";
import Dashboard from "./dashboard/page.tsx";
import Profile from "./profile/page.tsx";
import Help from "./help/page.tsx";
import { Layout } from "../components/layout/Layout.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import TravelEdit from "./travel_edit/page.tsx";

export enum ApplicationPath {
  HOME = "/",
  REGISTER = "/register",
  LOGIN = "/login",
  DASHBOARD = "/dashboard",
  PROFILE = "/profile",
  HELP = "/help",
  TRAVEL_EDIT = "/travel/edit/:id",
}

export const router = createBrowserRouter([
  {
    path: ApplicationPath.HOME,
    element: <Layout />,
    children: [
      {
        path: ApplicationPath.HOME,
        element: <App />,
      },
      {
        path: ApplicationPath.LOGIN,
        element: <Login />,
      },
      {
        path: ApplicationPath.REGISTER,
        element: <Register />,
      },
      {
        path: ApplicationPath.HOME,
        element: <ProtectedRoute />,
        children: [
          {
            path: ApplicationPath.DASHBOARD,
            element: <Dashboard />,
          },
          {
            path: ApplicationPath.PROFILE,
            element: <Profile />,
          },
          {
            path: ApplicationPath.HELP,
            element: <Help />,
          },
          {
            path: ApplicationPath.TRAVEL_EDIT,
            element: <TravelEdit />,
          },
        ],
      },
    ],
  },
]);
