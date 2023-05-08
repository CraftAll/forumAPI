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
exports.updateUser = exports.deleteUser = exports.getUser = exports.signin = exports.signup = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = require("../models/user.model");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req.body.email && req.body.password && req.body.username)) {
        res.sendStatus(401);
        return;
    }
    const newUser = new user_model_1.UserModel(Object.assign(Object.assign({}, req.body), { password: yield (0, bcryptjs_1.hash)(req.body.password, 10) }));
    if (newUser.validateSync()) {
        res.sendStatus(400);
        return;
    }
    if (!(yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/forumAPI")) ||
        !(yield newUser.save())) {
        res.sendStatus(500);
        return;
    }
    res.sendStatus(201);
    (0, mongoose_1.disconnect)();
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req.body.login && req.body.password)) {
        res.sendStatus(400);
        return;
    }
    const userData = {
        login: req.body.login,
        password: req.body.password,
    };
    if (!(yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/forumAPI"))) {
        res.sendStatus(500);
        return;
    }
    const user = yield user_model_1.UserModel.findOne({
        $or: [{ username: userData.login }, { email: userData.login }],
    }).exec();
    (0, mongoose_1.disconnect)();
    if (user)
        if (yield (0, bcryptjs_1.compare)(userData.password, user.password)) {
            res.sendStatus(200);
            return;
        }
    res.sendStatus(401);
});
exports.signin = signin;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.sendStatus(400);
        return;
    }
    if (!(yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/forumAPI"))) {
        res.sendStatus(500);
        return;
    }
    const user = yield user_model_1.UserModel.findById(req.params.id)
        .select(["username", "bio", "firstName", "lastName"])
        .exec();
    (0, mongoose_1.disconnect)();
    if (!user) {
        res.sendStatus(400);
        return;
    }
    res.send(user);
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.sendStatus(400);
        return;
    }
    if (!(yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/forumAPI"))) {
        res.sendStatus(500);
        return;
    }
    if (!(yield user_model_1.UserModel.findByIdAndDelete(req.params.id))) {
        res.sendStatus(500);
        return;
    }
    res.sendStatus(200);
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id || req.body.createdAt || req.body.password) {
        res.sendStatus(400);
        return;
    }
    if (!(yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/forumAPI"))) {
        res.sendStatus(500);
        return;
    }
    if (!(yield user_model_1.UserModel.findByIdAndUpdate(req.params.id, {
        $set: Object.assign(Object.assign({}, req.body), { updatedAt: Date.now() }),
    }).exec())) {
        res.sendStatus(400);
        return;
    }
    res.sendStatus(200);
});
exports.updateUser = updateUser;
