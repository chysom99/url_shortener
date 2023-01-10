process.env.NODE_ENV = "test";
const chai = require("chai");
const expect = chai.expect;

const supertest = require("supertest");
const app = require("../src/index");

describe("User Login Test", function () {
  describe("Positive Tests", function () {
    it("should login user successfully", async function () {
      const response = await supertest(app)
        .post("/api/v1/login")
        .send({
          email: "chisomofoedu0@gmail.com",
          password: "12345tgH",
        })
        .set("Accept", "application/json")
        .expect(201);

      const resp_data = response.body;
      expect(resp_data).to.be.an("object");
      expect(resp_data.message).to.contain("Login successful");
      expect(resp_data).to.have.property("data");
      expect(resp_data.data.loginToken).to.be.a("string");
      expect(resp_data.data.loginToken).to.not.equal("");
    });
  });

  describe("Negative Tests", function () {
    it("should not login user successfully ", async function () {
      const response = await supertest(app)
        .post("/api/v1/login")
        .send({
          email: "chisomofoedu0@gmail.com",
          password: "ofoed",
        })
        .set("Accept", "application/json")
        .expect(401);

      const resp_data = response.body;
      expect(resp_data).to.be.an("object");
      expect(resp_data.message).to.contain("Authentication failed");
    });
  });
});
