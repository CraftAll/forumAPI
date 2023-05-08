import { Router } from "express";
import {
  createComment,
  createPost,
  deleteComment,
  getAll,
  getPost,
} from "../controllers/post.controller";

export const postRouter = Router();
postRouter.get("/all", getAll);
postRouter.post("/create", createPost);
postRouter.get("/:id", getPost);
postRouter.post("/:id/comment", createComment);
postRouter.delete("/:id/comment/:commentId", deleteComment);
