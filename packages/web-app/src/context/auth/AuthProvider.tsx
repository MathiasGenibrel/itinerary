import React, {
  createContext,
  Dispatch,
  ReactElement,
  useReducer,
} from "react";
import { AuthAction, AuthState } from "./types";
import { authReducer } from "./authReducer";
import { ClientStorageRepository } from "../../helpers/repository/auth/ClientStorageRepository.ts";

interface AuthContext {
  state: AuthState;
}

interface AuthContextDispatcher {
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContext | null>(null);
export const AuthContextDispatcher =
  createContext<AuthContextDispatcher | null>(null);

interface Props {
  children: ReactElement;
}

const clientStorage = new ClientStorageRepository(localStorage);
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, clientStorage.get());

  return (
    <AuthContext.Provider value={{ state }}>
      <AuthContextDispatcher.Provider value={{ dispatch }}>
        {children}
      </AuthContextDispatcher.Provider>
    </AuthContext.Provider>
  );
};
