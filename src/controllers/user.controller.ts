import User from "@src/database/model/user.model";
import HttpStatus from "http-status-codes";
import { BadRequestError, ConflictError } from "@src/errors";
import type { IUser } from "@src/interface";
import { findUserByEmail } from "@src/repository/user.repository";
import { comparePassword, hashPassword, JWT, respond } from "@src/utilities";
import { RequestHandler } from "express";

export const userController = {
  createUser: (): RequestHandler => async (req, res, next) => {
    const { firstName, lastName, email, phoneNo, password } = req.body;
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        throw new ConflictError("Email already exist");
      }

      //Hashpassword
      const hashedPassword = await hashPassword(password);

      // Create new user
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        phoneNo,
        password: hashedPassword,
      });
      //   console.log("user", newUser);
      respond<IUser>(res, newUser, HttpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  },

  loginUser: (): RequestHandler => async (req, res, next) => {
    const { email, password } = req.body;
    let accesToken: string;
    try {
      const existingUser = await findUserByEmail(email);
      if (!existingUser) {
        throw new ConflictError("User not found");
      }

      const compare = await comparePassword(password, existingUser.password);

      if (!compare) {
        throw new BadRequestError("Invalid credentials");
      } else {
        accesToken = JWT.encode({ id: existingUser });
      }
      delete existingUser.password;

      return respond(
        res,
        { accesToken, userData: existingUser },
        HttpStatus.OK
      );
    } catch (error) {
      console.log("Login", error);
      next(error);
    }
  },
};
