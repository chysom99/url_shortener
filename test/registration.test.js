process.env.NODE_ENV = "test";
const chai = require("chai");
const expect = chai.expect;

const supertest = require("supertest");
const app = require("../src/index");

describe("User Registration Test", function () {
  describe("Positive Tests", function () {
    it("should register user successfully", async function () {
      const response = await supertest(app)
        .post("/api/v1/signup")
        .send({
          username: "Chisom9",
          firstname: "chisom",
          lastname: "ofoedu",
          email: Date.now() + "chisomofoedu9@gmail.com",
          password: "12345tgH",
        })
        .set("Accept", "application/json")
        .expect(201);

      const resp_data = response.body;

      expect(resp_data).to.be.an("object");
      //expect(resp_data.message).to.be.an("string");
      expect(resp_data.message).to.contain("User created successfully");
      expect(resp_data).to.have.property("user");
      expect(resp_data.user.username).to.be.a("string");
      expect(resp_data.user.firstname).to.be.a("string");
      expect(resp_data.user.lastname).to.be.a("string");
      expect(resp_data.user.email).to.be.a("string");
      expect(resp_data.user.password).to.be.a("string");
      expect(resp_data.user._id).to.be.a("string");
    });
  });

  describe("Negative Tests", function () {
    it("should not register user successfully when an email is reuse", async function () {
      const response = await supertest(app)
        .post("/api/v1/signup")
        .send({
          username: "Chisom9",
          firstname: "chisom",
          lastname: "ofoedu",
          email: "chisomofoedu9@gmail.com",
          password: "12345tgH",
        })
        .set("Accept", "application/json")
        .expect(509);

      const resp_data = response.body;
      expect(resp_data).to.be.an("object");
      expect(resp_data.message).to.be.a("string");
      expect(resp_data.message).to.contain("Email already taken");
    });
  });
});
