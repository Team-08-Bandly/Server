const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

let dataRegister = {
  name: "test account",
  email: "testClient@mail.com",
  password: "testing",
  accountType: "client",
};

let dataLogin = {
  email: "testClient@mail.com",
  password: "testing",
};

describe("User routes", () => {
  describe("POST /login", () => {
    beforeAll((done) => {
      User.create(dataRegister)
        .then((_) => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    afterAll((done) => {
      queryInterface
        .bulkDelete("Users", {})
        .then((_) => done())
        .catch((err) => done(err));
    });
    describe("Success process", () => {
      test("should send an object (access_token, email, id) with code 200", (done) => {
        request(app)
          .post("/login")
          .send(dataLogin)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("email", dataLogin.email);
            expect(res.body).toHavePropery("id", expect.any(Number));
            expect(res.body).toHaveProperty("access_token", expect.any(String));
            expect(res.body).toHaveProperty(
              "accountType",
              dataRegister.accountType
            );
            done();
          });
      });
    });
    describe("Error process", () => {
      test("should send an error with status 401 because invalid email", (done) => {
        const fakeEmail = { ...dataLogin, email: "fakeclient@mail.com" };
        request(app)
          .post("/login")
          .send(fakeEmail)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty(
              "message",
              "Invalid Email/Password"
            );
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send an error with status 401 because invalid password", (done) => {
        const falsePassword = { ...dataLogin, password: "fakePassword" };
        request(app)
          .post("/login")
          .send(falsePassword)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty(
              "message",
              "Invalid Email/Password"
            );
            expect(res.status).toBe(401);
            done();
          });
      });
    });
  });
});
