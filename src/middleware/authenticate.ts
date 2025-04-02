import { Request, Response, NextFunction } from "express";
import {
  NotBeforeError,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { NotAuthenticatedError } from "../errors";
import { JWT } from "../utilities";
import User from "@src/database/schema/user.schema";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new NotAuthenticatedError("No token provided"));
  }

  const [, token] = authorization.split(" ");

  try {
    if (!token) {
      return next(new NotAuthenticatedError("No token provided"));
    }

    const decoded = JWT.decode(token);

    // Find the user based on the ID from the decoded token
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new NotAuthenticatedError("Invalid token"));
    }

    res.locals.user = user.toObject();
    delete res.locals.user.password;

    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new NotAuthenticatedError("Token has expired"));
    }

    if (error instanceof NotBeforeError) {
      return next(new NotAuthenticatedError("Token used prematurely"));
    }

    if (error instanceof JsonWebTokenError) {
      return next(new NotAuthenticatedError("Invalid token"));
    }
    return next(error);
  }
};
