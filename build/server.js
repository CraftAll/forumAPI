"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/** source/server.ts */
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_router_1 = require("./routers/user.router");
const cors_1 = __importDefault(require("cors"));
const post_router_1 = require("./routers/post.router");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
/** Routes */
app.use("/user", user_router_1.userRouter);
app.use("/post", post_router_1.postRouter);
/** Error handling */
app.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
        message: error.message,
    });
});
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 6060;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
