"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now() },
});
exports.CommentModel = (0, mongoose_1.model)("Comment", commentSchema);
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    comments: { type: [commentSchema], required: true },
});
exports.PostModel = (0, mongoose_1.model)("Post", postSchema);
