"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe("User model test", () => {
    it("should create a user", async () => {
        const result = await store.create({
            first_name: "tony",
            last_name: "li",
            password: "test123",
        });
        expect(result.first_name).toEqual("tony");
    });
    it("should return a list of users", async () => {
        const result = await store.index();
        jasmine.objectContaining({
            first_name: "tony",
            last_name: "li",
        });
    });
    it("should return one user", async () => {
        const result = await store.show("1");
        expect(result.first_name).toEqual("tony");
    });
});
