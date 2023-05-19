import { OrderStore } from "../../models/order";

const store = new OrderStore();

describe("Order model test", () => {
  it("should create an order", async () => {
    const result = await store.create({
      user_id: 1,
      status: "complete",
    });
    expect(result.user_id).toEqual(1);
  });

  it("should return current orders by user", async () => {
    const result = await store.current_order("1");
    jasmine.objectContaining({
      user_id: 1,
      status: "complete",
    });
  });

  it("should return a list of complete orders by user", async () => {
    const result = await store.complete_order("1");
    jasmine.objectContaining({
      user_id: 1,
      status: "complete",
    });
  });
});
