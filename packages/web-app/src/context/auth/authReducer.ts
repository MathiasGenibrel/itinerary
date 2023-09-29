import {
  AuthAction,
  AuthActionType,
  AuthPayloadLogin,
  AuthPayloadUpdate,
  AuthState,
} from "./types";
import { ClientStorageRepository } from "../../helpers/repository/auth/ClientStorageRepository.ts";

const clientStorage = new ClientStorageRepository(localStorage);

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      const { user: loginUser } = action.payload as AuthPayloadLogin;

      clientStorage.saveCredential(loginUser);
      return {
        ...state,
        isAuthenticated: true,
        user: loginUser,
      };

    case AuthActionType.LOGOUT:
      clientStorage.deleteCredential();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case AuthActionType.UPDATE:
      const { user: updatedUser } = action.payload as AuthPayloadUpdate;

      clientStorage.saveCredential({ ...state.user!, ...updatedUser });
      return {
        ...state,
        isAuthenticated: true,
        user: { ...state.user!, ...updatedUser },
      };

    default:
      return state;
  }
};
