import { Request, Response } from "express";
import { Schema, connect, model } from "mongoose";
import { IUser } from "../models/user.model";
import { hash } from "bcryptjs";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
});

const User = model<IUser>("User", userSchema);
export const singup = async (req: Request, res: Response) => {
  const user = new User({
    email: req.body.email,
    passwordHash: await hash(req.body.password, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
  });
  await connect("mongodb://127.0.0.1:27017/forumAPI");
  await user.save();
  res.sendStatus(200);
};
