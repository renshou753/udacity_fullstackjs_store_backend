"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.create = exports.show = exports.index = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const store = new user_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
exports.index = index;
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
exports.show = show;
const create = async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.create = create;
const authenticate = async (req, res) => {
    try {
        const user = await store.authenticate(req.body.id, req.body.password);
        const token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.authenticate = authenticate;
