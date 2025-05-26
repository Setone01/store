import Product from "@src/database/model/product.model";
import HttpStatus from "http-status-codes";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  ResourceNotFoundError,
} from "@src/errors";
import { IProduct } from "@src/interface";
import {
  findOneProduct,
  getAllProducts,
  getProductById,
  updateProductById,
} from "@src/repository/product.repository";
import { respond } from "@src/utilities";
import { uploadImage } from "@src/utilities/cloudinary.utility";
import { RequestHandler } from "express";
// import {
//   getAllProducts,
//   getProductById,
// } from "@src/repository/user.repository";

export const productController = {
  createProduct: (): RequestHandler => async (req, res, next) => {
    const {
      name,
      description,
      price,
      category,
      quantity,
      createdBy,
      available,
    } = req.body;

    try {
      const user = res.locals.user;
      if (user.role !== "admin") {
        throw new ForbiddenError("Unauthorized access");
      }

      // Create for existing product
      const existingProduct = await findOneProduct({ name });
      if (existingProduct) {
        throw new ConflictError("Product already exists");
      }

      //Upload image to cloudinary
      const imageUpload = await uploadImage(req.file.path);

      // Create new product
      const newProduct = await Product.create({
        name,
        description,
        price,
        category,
        quantity,
        imageUrl: imageUpload,
        createdBy,
        available,
      });

      respond<IProduct>(res, newProduct, HttpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  },

  getAllProducts: (): RequestHandler => async (req, res, next) => {
    try {
      const products = await getAllProducts();
      respond<IProduct[]>(res, products, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  },

  getProductById: (): RequestHandler => async (req, res, next) => {
    const { productId } = req.params;

    try {
      const product = await getProductById(productId);
      if (!product) {
        throw new ResourceNotFoundError("Product not found");
      }

      respond<IProduct>(res, product, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  },

  updateProduct: (): RequestHandler => async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedProduct = await updateProductById(id, updateData);
      if (!updatedProduct) {
        throw new ConflictError("Product not found");
      }
      respond<IProduct>(res, updateData, HttpStatus.OK);
    } catch (error) {
      console.error("Error updating product", error);
      throw new BadRequestError("Failed to update product");
    }
  },
};
