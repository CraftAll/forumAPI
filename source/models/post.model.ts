import { InferSchemaType, Schema, model } from "mongoose";

const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now() },
});
export type Comment = InferSchemaType<typeof commentSchema>;
export const CommentModel = model("Comment", commentSchema);

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  comments: { type: [commentSchema], required: true },
});
export type Post = InferSchemaType<typeof postSchema>;
export const PostModel = model("Post", postSchema);
