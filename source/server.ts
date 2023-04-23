/** source/server.ts */
import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routers/user.router";
import { postRouter } from "./routers/post.router";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/** Routes */
app.use("/user", userRouter);
app.use("/post", postRouter);
/** Error handling */
app.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

const PORT: any = process.env.PORT ?? 6060;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
