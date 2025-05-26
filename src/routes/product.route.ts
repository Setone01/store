import { productController } from "@src/controllers/product.controller";
import { authenticate } from "@src/middleware/authenticate";
import { createProductSchema } from "@src/validations/product.validation";
import { Router } from "express";

const productRouter = Router();

productRouter.post(
  "/product/create-product",
  authenticate,
  createProductSchema,
  productController.createProduct()
);
productRouter.get(
  "/product/get-all-products",
  productController.getAllProducts()
);
productRouter.get(
  "/product/get-product-by-id/:productId",
  productController.getProductById()
);

productRouter.patch(
  "/product/update-product/:id",
  productController.updateProduct
);

export default productRouter;
