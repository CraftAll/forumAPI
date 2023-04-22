import { Router } from "express";
import { singup } from "../controllers/user.controller";

export const userRouter = Router();

userRouter.post("/singup", singup);
