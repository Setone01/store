import Product from "@src/database/model/product.model";
import { IProduct } from "@src/interface";

export const findOneProduct = async (
  filter: Partial<IProduct>
): Promise<IProduct | null> => {
  const product = await Product.findOne(filter);
  return product;
};
