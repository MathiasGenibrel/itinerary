import { useAuth } from "../context/auth/hooks/useAuth.tsx";
import { LoginResponse } from "@shared/contract/auth.ts";

export const useAuthenticatedUser = (): LoginResponse => {
  const auth = useAuth();
  if (!auth.state.isAuthenticated) throw new Error("User is not connected");
  return auth.state.user!;
};
