import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import Register from "./register/page.tsx";
import Login from "./login/page.tsx";

export enum ApplicationPath {
  HOME = "/",
  REGISTER = "/register",
  LOGIN = "/login",
}

export const router = createBrowserRouter([
  {
    path: ApplicationPath.HOME,
    element: <App />,
  },
  {
    path: ApplicationPath.REGISTER,
    element: <Register />,
  },
  {
    path: ApplicationPath.LOGIN,
    element: <Login />,
  },
]);
