import { Request, Response } from "express";
import { connect, disconnect } from "mongoose";
import { compare, hash } from "bcryptjs";
import { UserModel } from "../models/user.model";
export const signup = async (req: Request, res: Response) => {
  if (!(req.body.email && req.body.password && req.body.username)) {
    res.sendStatus(401);
    return;
  }
  const newUser = new UserModel({
    ...req.body,
    password: await hash(req.body.password, 10),
  });
  if (newUser.validateSync()) {
    res.sendStatus(400);
    return;
  }
  if (
    !(await connect("mongodb://127.0.0.1:27017/forumAPI")) ||
    !(await newUser.save())
  ) {
    res.sendStatus(500);
    return;
  }
  res.sendStatus(201);
  disconnect();
};
export const signin = async (req: Request, res: Response) => {
  if (!(req.body.login && req.body.password)) {
    res.sendStatus(400);
    return;
  }
  const userData = {
    login: req.body.login,
    password: req.body.password,
  };
  if (!(await connect("mongodb://127.0.0.1:27017/forumAPI"))) {
    res.sendStatus(500);
    return;
  }
  const user = await UserModel.findOne({
    $or: [{ username: userData.login }, { email: userData.login }],
  }).exec();
  disconnect();
  if (user)
    if (await compare(userData.password, user.password)) {
      res.sendStatus(200);
      return;
    }
  res.sendStatus(401);
};
export const getUser = async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }
  if (!(await connect("mongodb://127.0.0.1:27017/forumAPI"))) {
    res.sendStatus(500);
    return;
  }
  const user = await UserModel.findById(req.params.id)
    .select(["username", "bio", "firstName", "lastName"])
    .exec();
  disconnect();
  if (!user) {
    res.sendStatus(400);
    return;
  }
  res.send(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }
  if (!(await connect("mongodb://127.0.0.1:27017/forumAPI"))) {
    res.sendStatus(500);
    return;
  }
  if (!(await UserModel.findByIdAndDelete(req.params.id))) {
    res.sendStatus(500);
    return;
  }
  res.sendStatus(200);
};

export const updateUser = async (req: Request, res: Response) => {
  if (!req.params.id || req.body.createdAt || req.body.password) {
    res.sendStatus(400);
    return;
  }

  if (!(await connect("mongodb://127.0.0.1:27017/forumAPI"))) {
    res.sendStatus(500);
    return;
  }
  if (
    !(await UserModel.findByIdAndUpdate(req.params.id, {
      $set: { ...req.body, updatedAt: Date.now() },
    }).exec())
  ) {
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
};
