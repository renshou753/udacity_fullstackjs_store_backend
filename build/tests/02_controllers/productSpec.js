"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const auth_1 = require("../../utils/auth");
const request = (0, supertest_1.default)(index_1.default);
const token = (0, auth_1.createToken)(1);
describe("Test product controllers: ", () => {
    it("should return a new product", () => {
        const data = {
            name: "product 1",
            price: 20,
            category_id: 1,
        };
        request
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send(data)
            .expect("Content-Type", /json/)
            .expect(200);
    });
    it("should show products", () => {
        request.get("/api/products").expect("Content-Type", /json/).expect(200);
    });
    it("should show one product", () => {
        request.get("/api/products/1").expect("Content-Type", /json/).expect(200);
    });
});
