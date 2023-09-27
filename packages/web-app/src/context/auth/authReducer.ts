import { AuthAction, AuthActionType, AuthState } from "./types";
import { ClientStorageRepository } from "../../helpers/repository/auth/ClientStorageRepository.ts";

const clientStorage = new ClientStorageRepository(localStorage);

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      clientStorage.save(action.payload.user);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case AuthActionType.LOGOUT:
      clientStorage.remove();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
