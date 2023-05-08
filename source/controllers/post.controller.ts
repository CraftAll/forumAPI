import { Request, Response } from "express";
import { connect, disconnect } from "mongoose";
import { CommentModel, PostModel } from "../models/post.model";

export const getAll = async (req: Request, res: Response) => {
  if (!(await connect("mongodb://127.0.0.1:27017/forumAPI"))) {
    res.sendStatus(500);
    return;
  }
  const posts = await PostModel.find()
    .select(["title", "createdAt", "author"])
    .populate("author", ["firstName", "lastName", "username"])
    .exec();
  res.send(posts);
};
export const createPost = async (req: Request, res: Response) => {
  const newPost = new PostModel({
    author: req.body.author,
    content: req.body.content,
    title: req.body.title,
  });
  if (newPost.validateSync()) {
    res.sendStatus(400);
    return;
  }
  if (!(await connect("mongodb://127.0.0.1:27017/forumAPI"))) {
    res.sendStatus(500);
    return;
  }
  await newPost.save();
  disconnect();
  res.sendStatus(201);
};

export const getPost = async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }
  if (!(await connect("mongodb://127.0.0.1:27017/forumAPI"))) {
    res.sendStatus(500);
    return;
  }
  const post = await PostModel.findById(req.params.id)
    .select(["title", "content", "createdAt", "author", "comments"])
    .populate("author", ["firstName", "lastName", "username"])
    .populate("comments.author", ["firstName", "lastName", "username"])
    .exec();
  disconnect();
  if (!post) {
    res.sendStatus(400);
    return;
  }
  res.send(post);
};

export const createComment = async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }
  if (!(await connect("mongodb://127.0.0.1:27017/forumAPI"))) {
    res.sendStatus(500);
    return;
  }
  const post = await PostModel.findById(req.params.id).exec();
  if (!post) {
    res.sendStatus(400);
    return;
  }
  const comment = new CommentModel({
    content: req.body.content,
    author: req.body.author,
  });
  post.comments.push(comment);
  await post.save();
  disconnect();
  res.sendStatus(201);
};

export const deleteComment = async (req: Request, res: Response) => {
  if (!req.params.id || !req.params.commentId) {
    res.sendStatus(400);
    return;
  }
  if (!(await connect("mongodb://127.0.0.1:27017/forumAPI"))) {
    res.sendStatus(500);
    return;
  }
  const post = await PostModel.findById(req.params.id).exec();
  if (!post) {
    res.sendStatus(400);
    return;
  }
  post.comments.id(req.params.commentId)?.deleteOne();
  await post.save();
  disconnect();
  res.sendStatus(200);
};
