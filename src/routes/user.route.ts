import { userController } from "@src/controllers/user.controller";
import { authenticate } from "@src/middleware/authenticate";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", userController.createUser());
userRouter.post("/login", userController.loginUser());

export default userRouter;
