import { Router } from "express";
import {
  deleteUser,
  getUser,
  signin,
  signup,
  updateUser,
} from "../controllers/user.controller";

export const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id", updateUser);
