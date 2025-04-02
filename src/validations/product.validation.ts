import { celebrate, Joi, Segments } from "celebrate";

export const createProductSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().trim().messages({
      "string.base": "Product name must be a string",
      "string.empty": "Product name is required",
    }),

    description: Joi.string().required().trim().messages({
      "string.base": "Description must be a string",
      "string.empty": "Description is required",
    }),

    price: Joi.number().required().min(0).messages({
      "number.base": "Price must be a number",
      "number.empty": "Price is required",
      "number.min": "Price must be greater than or equal to 0",
    }),

    category: Joi.string().required().trim().messages({
      "string.base": "Category must be a string",
      "string.empty": "Category is required",
    }),

    quantity: Joi.number().required().min(0).messages({
      "number.base": "Quantity must be a number",
      "number.empty": "Quantity is required",
      "number.min": "Quantity must be greater than or equal to 0",
    }),

    imageUrl: Joi.string().uri().optional().messages({
      "string.base": "Image URL must be a string",
      "string.uri": "Image URL must be a valid URI",
    }),

    createdBy: Joi.string().required().trim().messages({
      "string.base": "Created by must be a string",
      "string.empty": "Created by is required",
    }),

    available: Joi.boolean().optional().default(true).messages({
      "boolean.base": "Available must be a boolean",
    }),
  }),
});
