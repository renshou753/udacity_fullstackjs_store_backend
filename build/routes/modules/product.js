"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../utils/auth");
const router = express_1.default.Router();
const ProductControllers_1 = require("../../api/ProductControllers");
router.get("/", ProductControllers_1.index);
router.get("/popular", ProductControllers_1.product_popular);
router.get("/:id", ProductControllers_1.show);
router.post("/", auth_1.verifyAuthToken, ProductControllers_1.create);
router.get("/category/:category", ProductControllers_1.product_by_category);
exports.default = router;
