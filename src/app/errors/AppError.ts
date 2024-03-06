class AppError extends Error {
  public statusCode: string;
  constructor(statusCode: string, message: string, stack: string = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    }
  }
}

export default AppError;
