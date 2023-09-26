import { useState } from "react";
import { AuthRepository } from "../../../helpers/repository/auth/AuthRepository";
import { AuthMemoryRepository } from "../../../helpers/repository/auth/AuthMemoryRepository";
import { RegisterRequest } from "@shared/contract/auth";
import { useRouter } from "next/navigation";

const authService: AuthRepository = new AuthMemoryRepository();

export const useRegisterForm = () => {
  const router = useRouter();
  const [isLoading, setFormLoading] = useState<boolean>(false);

  return {
    isLoading,
    /**
     * Changes the state of the button to loading state.
     * Sends data to authentication repository to create account
     * @param authCredential - User data for account creation
     */
    promise: (authCredential: RegisterRequest) => {
      setFormLoading(true);
      return authService.register(authCredential);
    },
    /**
     * Changes toast state, to success state and redirect user to home page.
     */
    success: () => {
      setFormLoading(false);
      router.push("/");
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
