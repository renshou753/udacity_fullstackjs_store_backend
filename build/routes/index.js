"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rootRouter = express_1.default.Router();
const product_1 = __importDefault(require("./modules/product"));
const user_1 = __importDefault(require("./modules/user"));
const order_1 = __importDefault(require("./modules/order"));
const category_1 = __importDefault(require("./modules/category"));
rootRouter.use("/products", product_1.default);
rootRouter.use("/users", user_1.default);
rootRouter.use("/orders", order_1.default);
rootRouter.use("/categories", category_1.default);
exports.default = rootRouter;
