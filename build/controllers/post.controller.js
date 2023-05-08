"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = exports.getPost = exports.createPost = exports.getAll = void 0;
const mongoose_1 = require("mongoose");
const post_model_1 = require("../models/post.model");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/forumAPI"))) {
        res.sendStatus(500);
        return;
    }
    const posts = yield post_model_1.PostModel.find()
        .select(["title", "createdAt", "author"])
        .populate("author", ["firstName", "lastName", "username"])
        .exec();
    res.send(posts);
});
exports.getAll = getAll;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = new post_model_1.PostModel({
        author: req.body.author,
        content: req.body.content,
        title: req.body.title,
    });
    if (newPost.validateSync()) {
        res.sendStatus(400);
        return;
    }
    if (!(yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/forumAPI"))) {
        res.sendStatus(500);
        return;
    }
    yield newPost.save();
    (0, mongoose_1.disconnect)();
    res.sendStatus(201);
});
exports.createPost = createPost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.sendStatus(400);
        return;
    }
    if (!(yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/forumAPI"))) {
        res.sendStatus(500);
        return;
    }
    const post = yield post_model_1.PostModel.findById(req.params.id)
        .select(["title", "content", "createdAt", "author", "comments"])
        .populate("author", ["firstName", "lastName", "username"])
        .populate("comments.author", ["firstName", "lastName", "username"])
        .exec();
    (0, mongoose_1.disconnect)();
    if (!post) {
        res.sendStatus(400);
        return;
    }
    res.send(post);
});
exports.getPost = getPost;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.sendStatus(400);
        return;
    }
    if (!(yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/forumAPI"))) {
        res.sendStatus(500);
        return;
    }
    const post = yield post_model_1.PostModel.findById(req.params.id).exec();
    if (!post) {
        res.sendStatus(400);
        return;
    }
    const comment = new post_model_1.CommentModel({
        content: req.body.content,
        author: req.body.author,
    });
    post.comments.push(comment);
    yield post.save();
    (0, mongoose_1.disconnect)();
    res.sendStatus(201);
});
exports.createComment = createComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.params.id || !req.params.commentId) {
        res.sendStatus(400);
        return;
    }
    if (!(yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/forumAPI"))) {
        res.sendStatus(500);
        return;
    }
    const post = yield post_model_1.PostModel.findById(req.params.id).exec();
    if (!post) {
        res.sendStatus(400);
        return;
    }
    (_a = post.comments.id(req.params.commentId)) === null || _a === void 0 ? void 0 : _a.deleteOne();
    yield post.save();
    (0, mongoose_1.disconnect)();
    res.sendStatus(200);
});
exports.deleteComment = deleteComment;
