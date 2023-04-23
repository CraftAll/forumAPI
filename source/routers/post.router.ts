import { Router } from "express";
import {
  create,
  get,
  getAll,
  getFromAuthor,
} from "../controllers/post.controller";

export const postRouter = Router();

postRouter.post("/create", create);
postRouter.get("/", getAll);
postRouter.get("/formAuthor", getFromAuthor);
postRouter.get("/:title", get);
