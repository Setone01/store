import Product from "@src/database/model/product.model";
import User from "@src/database/model/user.model";
import { IUser } from "@src/interface";

export const createUser = async (filters: Partial<IUser>): Promise<IUser> => {
  const newUser = await User.create(filters);
  return newUser;
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const foundUser = await User.findOne({ email });
  return foundUser;
};

export const getAllProducts = async () => {
  return Product.find();
};

export const getProductById = async (id: string) => {
  return await Product.findById(id);
};
