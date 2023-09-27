import { useState } from "react";
import { AuthRepository } from "../../../helpers/repository/auth/AuthRepository";
import { AuthMemoryRepository } from "../../../helpers/repository/auth/AuthMemoryRepository";
import { LoginResponse, RegisterRequest } from "@shared/contract/auth";

const authService: AuthRepository = new AuthMemoryRepository();

export const useRegisterForm = () => {
  const [isLoading, setFormLoading] = useState<boolean>(false);

  return {
    isLoading,
    /**
     * Changes the state of the button to loading state.
     * Sends data to authentication repository to create account
     * @param authCredential - User data for account creation
     */
    promise: async (authCredential: RegisterRequest) => {
      setFormLoading(true);
      await authService.register(authCredential);
      return await authService.login({
        email: authCredential.email,
        password: authCredential.password,
      });
    },
    /**
     * Changes toast state, to success state and redirect user to home page.
     */
    success: (data: LoginResponse) => {
      console.log("[DEBUG] Register Request : ", data);
      setFormLoading(false);
      // router.push("/"); TODO REDIRECT USER AFTER LOGIN
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
