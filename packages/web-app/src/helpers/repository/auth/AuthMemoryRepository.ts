import { LoginResponse } from '@shared/contract/auth';
import { AuthRepository } from "./AuthRepository";

export class AuthMemoryRepository implements AuthRepository {
  private readonly timeout: number = 2e3;
  private readonly percentageSuccessRating: number = 0.5;

  public async register(): Promise<void> {
    await this.delay();

    const isSuccessfulRequest = Math.random() < this.percentageSuccessRating;

    if (!isSuccessfulRequest) throw new Error("This username is already used");
  }

  private delay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, this.timeout);
    });
  }

  public async login(): Promise<LoginResponse> {
    await this.delay();

    const isSuccessfulRequest = Math.random() < this.percentageSuccessRating;

    if (!isSuccessfulRequest) throw new Error("Bad credentials");
    return {
      id: 1,
      email: "notch@minecraft.net",
      username: "notch",
      token: "Never dig down!",
    }
  }

  public async updateCredentials(authCredential : LoginResponse): Promise<LoginResponse> {
    await this.delay();

    const isSuccessfulRequest = Math.random() < this.percentageSuccessRating;

    if (!isSuccessfulRequest) throw new Error("Nope!");
    return {
      id: authCredential.id,
      email: authCredential.email,
      username: authCredential.username,
      token: authCredential.token,
    }
  }
}
