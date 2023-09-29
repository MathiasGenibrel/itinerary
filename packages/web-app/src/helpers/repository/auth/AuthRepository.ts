import {
  AccountUpdateRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "@shared/contract/auth";

export interface AuthRepository {
  register: (authCredential: RegisterRequest) => Promise<void>;
  login: (authCredential: LoginRequest) => Promise<LoginResponse>;
  update: (authCredential: AccountUpdateRequest) => Promise<void>;
}
