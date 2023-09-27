import { AuthAction, AuthActionType, AuthState } from "./types";

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case AuthActionType.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
