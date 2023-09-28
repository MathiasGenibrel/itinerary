import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/hooks/useAuth.tsx";
import { ApplicationPath } from "./router.tsx";

export const ProtectedRoute = () => {
  const auth = useAuth();

  if (!auth.state.isAuthenticated)
    return <Navigate to={ApplicationPath.HOME} />;
  return <Outlet />;
};
