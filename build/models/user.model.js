"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: { validator: (v) => /.+@.+\..+/.test(v) },
    },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
