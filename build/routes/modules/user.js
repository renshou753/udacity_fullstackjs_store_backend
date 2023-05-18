"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../utils/auth");
const router = express_1.default.Router();
const UserControllers_1 = require("../../api/UserControllers");
router.get("/", auth_1.verifyAuthToken, UserControllers_1.index);
router.get("/:id", auth_1.verifyAuthToken, UserControllers_1.show);
router.post("/", UserControllers_1.create);
router.post("/login", UserControllers_1.authenticate);
exports.default = router;
