/** source/server.ts */
import express from "express";
import * as dotenv from "dotenv";
import { userRouter } from "./routers/user.router";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Routes */
app.use("/user", userRouter);
/** Error handling */
app.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

const PORT: any = process.env.PORT ?? 6060;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
