import Product from "@src/database/model/product.model";
import { IProduct } from "@src/interface";

export const findOneProduct = async (
  filter: Partial<IProduct>
): Promise<IProduct | null> => {
  const product = await Product.findOne(filter);
  return product;
};

export const getAllProducts = async () => {
  return Product.find();
};

export const getProductById = async (id: string) => {
  return await Product.findById(id);
};

export const updateProductById = async (
  id: string,
  updateData: Partial<typeof Product>
) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return updatedProduct;
};
