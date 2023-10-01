import { useState } from "react";
import { AuthRepository } from "../../../../helpers/repository/auth/AuthRepository.ts";
import { LoginRequest, LoginResponse } from "@shared/contract/auth.ts";
import { useAuthDispatcher } from "../../../../context/auth/hooks/useAuthDispatcher.tsx";
import { AuthActionType } from "../../../../context/auth/types.ts";
import { useNavigate } from "react-router-dom";
import { ApplicationPath } from "../../../../pages/router.tsx";
import { AuthRemoteRepository } from "../../../../helpers/repository/auth/AuthRemoteRepository.ts";

const authService: AuthRepository = new AuthRemoteRepository();

export const useLoginForm = () => {
  const [isLoading, setFormLoading] = useState<boolean>(false);
  const { dispatch } = useAuthDispatcher();
  const navigate = useNavigate();

  return {
    isLoading,
    /**
     * Changes the state of the button to loading state.
     * Sends data to authentication repository to create account
     * @param authCredential - User data for account creation
     */
    promise: async (authCredential: LoginRequest) => {
      setFormLoading(true);
      return await authService.login(authCredential);
    },
    /**
     * Changes toast state, to success state and redirect user to home page.
     */
    success: (data: LoginResponse) => {
      dispatch({ type: AuthActionType.LOGIN, payload: { user: data } });
      setFormLoading(false);
      navigate(ApplicationPath.HOME);
      return "Your account has been created";
    },
    /**
     * Changes toast state, to error state.
     * Notify user of the current error.
     * @param data - Contains error information.
     */
    error: (data: Error) => {
      setFormLoading(false);
      return data.message;
    },
  };
};
