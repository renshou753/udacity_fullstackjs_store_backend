import supertest from "supertest";
import app from "../../index";
import { createToken } from "../../utils/auth";

const request = supertest(app);
const token: string = createToken(1);

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
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
