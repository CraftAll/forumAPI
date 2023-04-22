import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
});

export const User = model<IUser>("User", userSchema);
