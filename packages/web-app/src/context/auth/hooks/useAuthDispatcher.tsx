import {useContext} from "react";
import {AuthContextDispatcher} from "../AuthProvider.tsx";

/**
 * Enables access to authentication context data modifiers.
 */
export const useAuthDispatcher = () => {
  const context = useContext(AuthContextDispatcher);
  if (!context) {
    throw new Error("useAuthDispatcher must be used within an AuthProvider");
  }
  return context;
};
