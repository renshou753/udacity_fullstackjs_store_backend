"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../models/category");
const store = new category_1.CategoryStore();
describe("Category model test", () => {
    it("should create a category", async () => {
        const result = await store.create({
            name: "RPG",
        });
        expect(result).toEqual({
            name: "RPG",
        });
    });
});
