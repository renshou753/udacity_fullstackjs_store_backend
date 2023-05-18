import { ProductStore } from "../../models/product";

const store = new ProductStore();

describe("Product model test", () => {
  it("should create a product", async () => {
    const result = await store.create({
      name: "Test product 1",
      price: 123,
      category_id: 1,
    });
    expect(result.name).toEqual("Test product 1");
  });

  it("should return products", async () => {
    const result = await store.index();
    jasmine.objectContaining({
      name: "Test product 1",
      price: "123",
      category_id: 1,
    });
  });

  it("should return one product", async () => {
    const result = await store.show("1");
    expect(result.name).toEqual("Test product 1");
  });
});
