import { LoginResponse } from "@shared/contract/auth.ts";

export class ClientStorageRepository {
  private readonly key: string = "credential";

  constructor(private readonly storage: Storage) {}

  public save(credential: LoginResponse): void {
    this.storage.setItem("credential", JSON.stringify(credential));
  }

  public remove(): void {
    this.storage.removeItem(this.key);
  }
}
