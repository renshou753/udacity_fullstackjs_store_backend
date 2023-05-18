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
describe("Test user controllers: ", () => {
    it("should return a new user", () => {
        const data = {
            first_name: "alice",
            last_name: "wang",
            password: "1231234124",
        };
        request
            .post("/api/users")
            .send(data)
            .expect("Content-Type", /json/)
            .expect(200);
    });
    it("should show users", () => {
        request
            .get("/api/users")
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200);
    });
    it("should show one user", () => {
        request.get("/api/users/1").expect("Content-Type", /json/).expect(200);
    });
});
