class APIError extends Error {
  private statusCode: number;
  private isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad request") {
    return new APIError(400, message);
  }

  static unauthorized(message = "Unauthorized") {
    return new APIError(401, message);
  }

  static conflict(message = "Conflict") {
    return new APIError(409, message);
  }

}

export default APIError