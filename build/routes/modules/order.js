"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../utils/auth");
const router = express_1.default.Router();
const OrderControllers_1 = require("../../api/OrderControllers");
router.get("/current/users/:id", auth_1.verifyAuthToken, OrderControllers_1.current_order);
router.get("/completed/users/:id", auth_1.verifyAuthToken, OrderControllers_1.complete_order);
exports.default = router;
