import { LoginResponse } from "@shared/contract/auth.ts";
import { AuthState } from "../../../context/auth/types.ts";
import { z } from "zod";

export class ClientStorageRepository {
  private readonly key: string = "credential";
  private readonly credentialSchema = z.object({
    id: z.number().int(),
    email: z.string().email(),
    username: z.string().max(64),
    token: z.string(),
  });

  constructor(private readonly storage: Storage) {}

  /**
   * Save credential in client storage, this storage can be anything that respects Storage interface.
   * @param credential - User credential
   */
  public save(credential: LoginResponse): void {
    this.storage.setItem("credential", JSON.stringify(credential));
  }

  /**
   * Get credential from client storage.
   */
  public get(): AuthState {
    const credential = this.getCredential();
    return {
      isAuthenticated: !!credential,
      user: credential ?? null,
    };
  }

  /**
   * Remove credential from client storage
   */
  public remove(): void {
    this.storage.removeItem(this.key);
  }

  /**
   * Check credential integrity, show a default error is the integrity is not respected.
   * @param credential - credential from client storage.
   * @private
   */
  private credentialIntegrityCheck(credential: LoginResponse): boolean {
    try {
      this.credentialSchema.parse(credential);
      return true;
    } catch (_) {
      console.error("[ERROR] On credential integrity with ClientStorage.");
      return false;
    }
  }

  /**
   * Get credential from storage and check is integrity.
   * @private
   */
  private getCredential(): LoginResponse | void {
    const credential = this.storage.getItem(this.key);
    if (!credential) return;

    const parsedCredential = JSON.parse(credential);
    if (this.credentialIntegrityCheck(parsedCredential))
      return parsedCredential;
  }
}
