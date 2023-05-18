import { CategoryStore } from "../../models/category";

const store = new CategoryStore();

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
