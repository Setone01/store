import { celebrate, Joi, Segments } from "celebrate";

export const createUserSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().trim().required().min(3).max(50).messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required",
      "string.min": "First name must be at least 3 characters long",
    }),

    lastName: Joi.string().trim().required().min(3).max(50).messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 3 characters long",
    }),

    email: Joi.string().email().required().lowercase().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
    }),

    phoneNo: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .required()
      .messages({
        "string.base": "Phone number must be a string",
        "string.empty": "Phone number is required",
        "string.pattern.base": "Phone number must be a valid 11-digit number",
      }),

    password: Joi.string()
      .required()
      .min(8)
      .pattern(/[a-zA-Z0-9]/)
      .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base":
          "Password must contain at least one letter and one number",
      }),

    role: Joi.string().valid("user", "admin").default("user").messages({
      "string.base": "Role must be a string",
      "string.empty": "Role is required",
      "any.only": "Role must be either 'user' or 'admin'",
    }),
  }),
});
