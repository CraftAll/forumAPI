import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: { validator: (v: string) => /.+@.+\..+/.test(v) },
  },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
export type User = InferSchemaType<typeof userSchema>;
export const UserModel = model("User", userSchema);
