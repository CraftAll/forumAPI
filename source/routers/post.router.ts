import { Router } from "express";
import { create, getAll } from "../controllers/post.controller";

export const postRouter = Router();

postRouter.post("/create", create);
postRouter.get("/", getAll);
