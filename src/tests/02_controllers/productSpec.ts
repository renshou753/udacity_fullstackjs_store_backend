import supertest from "supertest";
import app from "../../index";
import { createToken } from "../../utils/auth";

const request = supertest(app);
const token: string = createToken(1);

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
