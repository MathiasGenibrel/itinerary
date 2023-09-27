import { LoginResponse } from "@shared/contract/auth.ts";

export enum AuthActionType {
  LOGIN = "login",
  LOGOUT = "logout",
}

export interface AuthState {
  isAuthenticated: boolean;
  user: LoginResponse | null;
}

interface AuthActionLogin {
  type: AuthActionType.LOGIN;
  payload: { user: LoginResponse };
}

interface AuthActionLogout {
  type: AuthActionType.LOGOUT;
}

export type AuthAction = AuthActionLogin | AuthActionLogout;
