import HttpStatus from "http-status-codes";

import ErrorHandler from "./ErrorHandler";

export class ForbiddenError extends ErrorHandler {
  protected error_name = "not allowed";

  protected httpCode = HttpStatus.FORBIDDEN;

  public constructor(
    message: string = "Request is not allowed",
    error: Error = undefined,
    data: any = null
  ) {
    super(message, error, data);
    Error.captureStackTrace(this, this.constructor);
  }
}
