import { useState } from "react";
import { AuthRepository } from "../../helpers/repository/auth/AuthRepository.ts";
import { useAuthDispatcher } from "../../context/auth/hooks/useAuthDispatcher.tsx";
import { AccountUpdateRequest } from "@shared/contract/auth.ts";
import { AuthActionType } from "../../context/auth/types.ts";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser.tsx";
import { AuthRemoteRepository } from "../../helpers/repository/auth/AuthRemoteRepository.ts";

const authService: AuthRepository = new AuthRemoteRepository();

export const useProfileForm = () => {
  const [isLoading, setFormLoading] = useState<boolean>(false);
  const { dispatch } = useAuthDispatcher();
  const user = useAuthenticatedUser();

  return {
    isLoading,
    /**
     * Changes the state of the button to loading state.
     * Sends data to authentication repository to create account
     * @param authCredential - User data for account creation
     */
    promise: async (
      authCredential: Omit<AccountUpdateRequest, "token">,
    ): Promise<Omit<AccountUpdateRequest, "token">> => {
      setFormLoading(true);
      await authService.update({ ...authCredential, token: user.token });
      return authCredential;
    },
    /**
     * Changes toast state, to success state and redirect user to home page.
     */
    success: (data: Omit<AccountUpdateRequest, "token">) => {
      dispatch({ type: AuthActionType.UPDATE, payload: { user: data } });
      setFormLoading(false);
      return "Your account has been updated";
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
