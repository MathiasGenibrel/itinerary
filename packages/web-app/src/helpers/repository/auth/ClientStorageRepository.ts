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
  public saveCredential(credential: LoginResponse): void {
    this.storage.setItem(this.key, JSON.stringify(credential));
  }

  /**
   * Get credential from client storage.
   */
  public getCredential(): AuthState {
    const credential = this.getCredentialFromStorage();
    return {
      isAuthenticated: !!credential,
      user: credential ?? null,
    };
  }

  /**
   * Remove credential from client storage
   */
  public deleteCredential(): void {
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
  private getCredentialFromStorage(): LoginResponse | void {
    const credential = this.storage.getItem(this.key);
    if (!credential) return;

    const parsedCredential = JSON.parse(credential);
    if (this.credentialIntegrityCheck(parsedCredential))
      return parsedCredential;
  }
}
