import { AccountUpdateRequest, LoginResponse } from "@shared/contract/auth.ts";

export enum AuthActionType {
  LOGIN = "login",
  LOGOUT = "logout",
  UPDATE = "update",
}

export interface AuthState {
  isAuthenticated: boolean;
  user: LoginResponse | null;
}

export interface AuthPayloadLogin {
  user: LoginResponse;
}

export interface AuthPayloadUpdate {
  user: Omit<AccountUpdateRequest, "token">;
}

export interface AuthAction {
  type: AuthActionType;
  payload: AuthPayloadLogin | AuthPayloadUpdate;
}
