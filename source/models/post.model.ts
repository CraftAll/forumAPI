import { Schema, Types, model } from "mongoose";

export interface IPost {
  title: String;
  content: String;
  author: Types.ObjectId;
  createAt: Date;
}
const postSchema = new Schema<IPost>({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "Users" },
  createAt: Date,
});

export const Post = model<IPost>("Post", postSchema);
