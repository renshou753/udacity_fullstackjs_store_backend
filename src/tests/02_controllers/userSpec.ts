import supertest from "supertest";
import app from "../../index";
import { createToken } from "../../utils/auth";

const request = supertest(app);
const token: string = createToken(1);

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
