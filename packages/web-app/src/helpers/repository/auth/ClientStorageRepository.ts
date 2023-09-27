import { LoginResponse } from "@shared/contract/auth.ts";
import { AuthState } from "../../../context/auth/types.ts";

export class ClientStorageRepository {
  private readonly key: string = "credential";

  constructor(private readonly storage: Storage) {}

  public save(credential: LoginResponse): void {
    this.storage.setItem("credential", JSON.stringify(credential));
  }

  public get(): AuthState {
    const credential = this.getCredential();
    return {
      isAuthenticated: !!credential,
      user: credential ?? null,
    };
  }

  public remove(): void {
    this.storage.removeItem(this.key);
  }

  private getCredential(): LoginResponse | void {
    const credential = this.storage.getItem(this.key);
    if (credential !== null) return JSON.parse(credential);
  }
}
