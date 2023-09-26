import { RegisterRequest, LoginRequest, LoginResponse } from "@shared/contract/auth";

export interface AuthRepository {
  register: (authCredential: RegisterRequest) => Promise<void>;
  login: (authCredential: LoginRequest) => Promise<LoginResponse>;
}
