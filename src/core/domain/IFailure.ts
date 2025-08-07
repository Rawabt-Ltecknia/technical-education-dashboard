export default interface IFailure {
  getMessage(): string;
  getStatusCode(): string;
}

export class Failure implements IFailure {
  getMessage(): string {
    return this.message;
  }
  getStatusCode(): string {
    return this.statusCode;
  }

  public constructor(
    public readonly statusCode: string,
    public readonly message: string
  ) {}
}
