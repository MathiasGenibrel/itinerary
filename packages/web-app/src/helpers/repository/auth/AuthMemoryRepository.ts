import { AuthRepository } from "./AuthRepository";

export class AuthMemoryRepository implements AuthRepository {
  private readonly timeout: number = 2e3;
  private readonly percentageSuccessRating: number = 0.5;

  public async register(): Promise<void> {
    await this.delay();

    const isSuccessfulRequest = Math.random() < this.percentageSuccessRating;

    if (!isSuccessfulRequest) throw new Error("This username is already used");
  }

  private delay(timeout: number = 2e3): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  public async login(): Promise<void> {
    await this.delay();

    const isSuccessfulRequest = Math.random() < this.percentageSuccessRating;

    if (!isSuccessfulRequest) throw new Error("Bad credentials");
  }
}
