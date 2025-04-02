import Product from "@src/database/schema/product.schema";
import HttpStatus from "http-status-codes";
import { ConflictError, ForbiddenError } from "@src/errors";
import { IProduct } from "@src/interface";
import { findOneProduct } from "@src/repository/product.repository";
import { respond } from "@src/utilities";
import { uploadImage } from "@src/utilities/cloudinary.utility";
import { RequestHandler } from "express";

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
};
