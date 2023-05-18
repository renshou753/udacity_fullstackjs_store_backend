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
describe("Test order controllers: ", () => {
    it("should current order by user", () => {
        request
            .get("/api/orders/current/users/1")
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200);
    });
    it("should show complete orders by user", () => {
        request
            .get("/orders/completed/users/1")
            // .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200);
    });
});
