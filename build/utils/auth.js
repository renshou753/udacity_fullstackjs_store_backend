"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../config/index"));
const verifyAuthToken = (req, res, next) => {
    // filter out public url path
    const { publicPath } = index_1.default;
    if (publicPath.some((item) => item.test(req.url))) {
        next();
        return;
    }
    try {
        const auth = req.headers.authorization;
        if (auth == undefined) {
            res.status(401).send("No token provided");
            return;
        }
        const token = auth.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).send("Error processing jwt");
    }
};
exports.verifyAuthToken = verifyAuthToken;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_SECRET);
};
exports.createToken = createToken;
