import { RegisterRequest } from "@shared/contract/auth";

export interface AuthRepository {
  register: (authCredential: RegisterRequest) => Promise<void>;
}
