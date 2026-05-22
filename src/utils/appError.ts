export class AppError extends Error {
  public statusCode: number;
  public details: string;

  constructor(message: string, statusCode = 500, details: string) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
