import { userController } from "@src/controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", userController.createUser);

export default userRouter;
