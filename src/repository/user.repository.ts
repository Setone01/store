import User from "@src/database/schema/user.schema";
import { IUser } from "@src/interface";

export const createUser = async (filters: Partial<IUser>): Promise<IUser> => {
  const newUser = await User.create(filters);
  return newUser;
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const foundUser = await User.findOne({ email });
  return foundUser;
};
