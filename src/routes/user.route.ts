import { userController } from "@src/controllers/user.controller";
import { authenticate } from "@src/middleware/authenticate";
import { createUserSchema } from "@src/validations/user.validation";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", createUserSchema, userController.createUser());
userRouter.post("/login", userController.loginUser());

export default userRouter;
