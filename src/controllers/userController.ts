import variables from "@src/variables";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
export const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, variables.AUTH.rounds);

/**
 * compare Password
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {Boolean} return true or false
 */

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => await bcrypt.compare(password, hashedPassword);
