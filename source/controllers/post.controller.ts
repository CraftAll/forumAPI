import { Request, Response } from "express";
import { IPost, Post } from "../models/post.model";
import { connect } from "mongoose";

export const getAll = async (req: Request, res: Response) => {
  await connect("mongodb://172.0.0.1:27017/forumAPI");
  const posts = await Post.find<IPost>().exec();
  res.send(posts);
};
export const create = async (req: Request, res: Response) => {
  const post = new Post({
    author: req.body.author,
    content: req.body.content,
    createAt: new Date(),
    title: req.body.title,
  });
  await connect("mongodb://127.0.0.1:27017/forumAPI");
  if (await post.save()) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};
