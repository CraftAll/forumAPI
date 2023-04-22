import { Types } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}
