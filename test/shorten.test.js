process.env.NODE_ENV = "test";
const chai = require("chai");
const expect = chai.expect;
const sample_data = require("./test.data.json");

const supertest = require("supertest");
const app = require("../src/index");

//positive test for shorten url
describe("url Test", function () {
  describe("Positive Tests", function () {
    it("should successfully shorten a long url", async function () {
      const response = await supertest(app)
        .post("/api/v1/shorten")
        .set({
          Authorization: sample_data.auth_token,
          Accept: "application/json",
        })
        .send({
          longUrl:
            "https://www.google.com/search?q=spotify&rlz=1C5GCEM_en&oq=spotify&aqs=chrome.0.0i271j46i10i199i433i465i512j0i10i433i512j0i10i131i433i512l2j0i10i433i512j0i10i512j0i10i433i512l2j0i10i512.4107j1j7&sourceid=chrome&ie=UTF-8",
        })
        .expect(200);
      const resp_data = response.body;
      expect(resp_data).to.be.an("object");
      expect(resp_data).to.have.property("urlCode");
      expect(resp_data.urlCode).to.be.an("string");
      expect(resp_data).to.have.property("longUrl");
      expect(resp_data.longUrl).to.be.an("string");
      expect(resp_data).to.have.property("shortUrl");
      expect(resp_data.shortUrl).to.be.an("string");
      expect(resp_data).to.have.property("clicks");
      expect(resp_data.clicks).to.be.an("number");
      expect(resp_data).to.have.property("id");
      expect(resp_data.id).to.be.an("string");
    });
  });

  //positive test for deleting url
  it("should successfully delete a url", async function () {
    const response = await supertest(app)
      .delete("/api/v1/deleteurl/63bbdf3d21ffc6ec04cb0572")
      .set({
        Authorization: sample_data.auth_token,
        Accept: "application/json",
      })

      .expect(200);

    const resp_data = response.body;
    expect(resp_data).to.be.an("object");
    expect(resp_data).to.have.property("message");
    expect(resp_data.message).to.contain("url deleted");
  });

  //positive test for getting url
  it("should successfully get url", async function () {
    const response = await supertest(app)
      .get("/api/v1/geturl")
      .set({
        Authorization: sample_data.auth_token,
        Accept: "application/json",
      })

      .expect(200);
    const resp_data = response.body;
    expect(resp_data).to.be.an("object");
    expect(resp_data).to.have.property("url");
    expect(resp_data.url).to.be.an("array");
  });

  //Negative test for shorten url
  describe("Negative Tests", function () {
    it("should not shorten a long url", async function () {
      const response = await supertest(app)
        .post("/api/v1/shorten")
        .set({
          Authorization: sample_data.auth_token,
          Accept: "application/json",
        })
        .send({
          longUrl:
            "ttps://www.google.com/search?q=spotify&rlz=1C5GCEM_en&oq=spotify&aqs=chrome.0.0i271j46i10i199i433i465i512j0i10i433i512j0i10i131i433i512l2j0i10i433i512j0i10i512j0i10i433i512l2j0i10i512.4107j1j7&sourceid=chrome&ie=UTF-8",
        })
        .expect(401);
      const resp_data = response.body;
      expect(resp_data).to.be.an("object");
      expect(resp_data.message).to.be.an("string");
      expect(resp_data.message).to.contain("Invalid Long URL");
    });
  });

  //negative test for delete question
  it("should not delete a url", async function () {
    const response = await supertest(app)
      .delete("/api/v1/deleteurl/:id")
      .set({
        Authorization: sample_data.auth_token,
        Accept: "application/json",
      })
      .send({
        id: "3bbe46621ffc6ec04cb0584",
      })

      .expect(400);
    const resp_data = response.body;
    expect(resp_data).to.be.an("object");
    expect(resp_data.message).to.be.a("string");
    expect(resp_data.message).to.contain("url not found");
  });
});
