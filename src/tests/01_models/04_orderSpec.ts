import { OrderStore } from "../../models/order";

const store = new OrderStore();

describe("Order model test", () => {
  it("should create an order", async () => {
    const result = await store.create({
      product_id: 1,
      quantity: 200,
      user_id: 1,
      status: "complete",
    });
    expect(result.quantity).toEqual(200);
  });

  it("should return current orders by user", async () => {
    const result = await store.current_order("1");
    jasmine.objectContaining({
      product_id: 1,
      quantity: 200,
      user_id: 1,
      status: "complete",
    });
  });

  it("should return a list of complete orders by user", async () => {
    const result = await store.complete_order("1");
    jasmine.objectContaining({
      product_id: 1,
      quantity: 200,
      user_id: 1,
      status: "complete",
    });
  });
});
