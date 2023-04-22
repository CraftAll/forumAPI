import { Request, Response } from "express";
import { Schema, connect, disconnect, model } from "mongoose";
import { IUser } from "../models/user.model";
import { compare, hash } from "bcryptjs";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
});

const User = model<IUser>("User", userSchema);

export const signup = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.username || !req.body.password) {
    res.sendStatus(400);
    return;
  }
  const user = new User({
    email: req.body.email,
    passwordHash: await hash(req.body.password, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
  });
  await connect("mongodb://127.0.0.1:27017/forumAPI");
  if (await user.save()) {
    res.sendStatus(200);
    disconnect();
  }
};

export const signin = async (req: Request, res: Response) => {
  await connect("mongodb://127.0.0.1:27017/forumAPI");
  const user = await User.findOne<IUser>({
    $or: [{ username: req.body.login }, { email: req.body.login }],
  }).exec();
  if (user)
    if (await compare(req.body.password, user.passwordHash)) {
      res.send(user);
      return;
    }
  res.sendStatus(401);
};
