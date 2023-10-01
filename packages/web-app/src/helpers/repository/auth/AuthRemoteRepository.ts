import { AuthRepository } from "./AuthRepository.ts";
import {
  AccountUpdateRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "@shared/contract/auth.ts";

export class AuthRemoteRepository implements AuthRepository {
  private serviceURL = "http://localhost:4000";

  public async login(authCredential: LoginRequest): Promise<LoginResponse> {
    return await this.fetcher("/login", {
      method: "POST",
      body: JSON.stringify(authCredential),
    });
  }

  public async register(authCredential: RegisterRequest): Promise<void> {
    return await this.fetcher("/register", {
      method: "POST",
      body: JSON.stringify(authCredential),
    });
  }

  public async update(authCredential: AccountUpdateRequest): Promise<void> {
    return await this.fetcher("/profile/updateUser", {
      method: "PUT",
      body: JSON.stringify(authCredential),
    });
  }

  private async fetcher(endpoint: string, payload?: RequestInit) {
    const response = await fetch(this.serviceURL + endpoint, {
      ...payload,
      headers: { ...payload?.headers, "Content-Type": "application/json" },
    });

    if (response.status === 200) return await response.json();
    return;
  }
}
