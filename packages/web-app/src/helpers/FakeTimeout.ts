export abstract class FakeTimeout {
  private readonly timeout: number = 2e3; // 2 seconds
  protected delay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, this.timeout);
    });
  }
}
