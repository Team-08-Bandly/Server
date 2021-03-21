const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
const { generateToken } = require("../helpers/jwt");

let dataRegister = {
  name: "test account",
  email: "testClient@mail.com",
  password: "testing",
  accountType: "client",
};

let dataRegister2 = {
  name: "test account",
  email: "testClient1@mail.com",
  password: "testing",
  accountType: "client",
};

let dataLogin = {
  email: "testClient@mail.com",
  password: "testing",
};

let register = {
  name: "ridho",
  email: "ridho123@mail.com",
  password: "secret",
  accountType: "client",
};

let userToken;
let wrongAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InJpZGhvIGhhbnN5YWgiLCJlbWFpbCI6InJpZGhvMUBtYWlsLmNvbSIsImFjY291bnRUeXBlIjoiY2xpZW50IiwiaWF0IjoxNjE2MjI2NjgwfQ.lciaWw4D5bGhMVcei0yshEEwwu5Haqta8ZTNhgVYYjc";
describe("User Register", () => {
  describe("POST /register", () => {
    //? testing success
    describe("Success process", () => {
      //success
      test("should send an object (email,id) with status code 201", (done) => {
        request(app)
          .post("/register")
          .send(register)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("id", expect.any(Number));
            expect(res.body).toHaveProperty("email", register.email);
            expect(res.body).toHaveProperty("name", register.name);
            expect(res.body).toHaveProperty(
              "accountType",
              register.accountType
            );
            expect(res.status).toBe(201);
            done();
          });
      });
    });
    //! testing error
    describe("Error process", () => {
      //field (kolom) email tidak ada
      test("should send an error with status 400 because email null validation", (done) => {
        const withoutEmail = { ...register };
        delete withoutEmail.email;
        request(app)
          .post("/register")
          .send(withoutEmail)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Email cannot be null");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
      //email kosong
      test("should send an error with status 400 because empty email validation", (done) => {
        const emptyEmail = { ...register, email: "" };
        request(app)
          .post("/register")
          .send(emptyEmail)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Email is a required field");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
      //duplicate email
      test("should send an error with status 400 because duplicate email", (done) => {
        const duplicateEmail = { ...register };
        request(app)
          .post("/register")
          .send(duplicateEmail)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Email is already exists");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
      //format email salah
      test("should send an error with status 400 because invalid email format", (done) => {
        const invalidEmail = { ...register, email: "ridho.com" };
        request(app)
          .post("/register")
          .send(invalidEmail)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Invalid email format");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
      //field (kolom)  password tidak ada
      test("should send an error with status 400 because password null validation", (done) => {
        const withoutPassword = { ...register };
        delete withoutPassword.password;
        request(app)
          .post("/register")
          .send(withoutPassword)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Password cannot be null");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
      //password kosong
      test("should send an error with status 400 because empty password validation", (done) => {
        const emptyPasswordd = { ...register, password: "" };
        request(app)
          .post("/register")
          .send(emptyPasswordd)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Password is a required field");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
      //password kurang dari 6 character
      test("should send an error with status 400 because password min 6 character", (done) => {
        const falsePasswordd = { ...register, password: "hai" };
        request(app)
          .post("/register")
          .send(falsePasswordd)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Password min 6 character");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
      // field (kolom) name tidak ada
      test("should send an error with status 400 because name null validation", (done) => {
        const withoutName = { ...register };
        delete withoutName.name;
        request(app)
          .post("/register")
          .send(withoutName)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Name cannot be null");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
      //name kosong
      test("should send an error with status 400 because empty name validation", (done) => {
        const emptyName = { ...register, name: "" };
        request(app)
          .post("/register")
          .send(emptyName)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Name is a required field");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
      //field (kolom) accountType tidak ada
      test("should send an error with status 400 because accountType null validation", (done) => {
        const withoutAccountType = { ...register };
        delete withoutAccountType.accountType;
        request(app)
          .post("/register")
          .send(withoutAccountType)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Account cannot be empty");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
      //accountType kosong
      test("should send an error with status 400 because empty accountType validation", (done) => {
        const emptyAccountType = { ...register, accountType: "" };
        request(app)
          .post("/register")
          .send(emptyAccountType)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain(
              "Account type is a required field"
            );
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
      //memasukan accountType yang tidak ada
      test("should send an error with status 400 because different accountType validation", (done) => {
        const differentAccountType = { ...register, accountType: "supir" };
        request(app)
          .post("/register")
          .send(differentAccountType)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Not have that account type");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
    });
  });
});

//Login starts here
describe("User routes", () => {
  describe("POST /login", () => {
    beforeAll((done) => {
      User.create(dataRegister)
        .then((data) => {
          console.log(data.id, "dari before-------------");
          userId = data.id;
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    describe("Success process", () => {
      test("should send an object (access_token, email, id) with code 200", (done) => {
        request(app)
          .post("/login")
          .send(dataLogin)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("access_token", expect.any(String));
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

describe("Get user by id from access token", () => {
  describe("GET /users/", () => {
    beforeAll((done) => {
      User.create(dataRegister2)
        .then((data) => {
          userToken = generateToken({
            id: data.id,
            email: data.email,
            name: data.name,
            accountType: data.accountType,
          });
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    afterAll((done) => {
      queryInterface
        .bulkDelete("Users", {})
        .then((_) => {
          sequelize.close();
          done();
        })
        .catch((err) => done(err));
    });
    describe("Success process", () => {
      test("should send an object with status code 200", (done) => {
        request(app)
          .get("/users")
          .set("access_token", userToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("id");
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("id");
            expect(res.body).toHaveProperty("name");
            expect(res.body).toHaveProperty("email");
            expect(res.body).toHaveProperty("accountType");
            expect(res.status).toBe(200);
            done();
          });
      });
    });
    describe("Error process", () => {
      test("should send an error with status 401 because wrong access token", (done) => {
        request(app)
          .get("/users")
          .set("access_token", "123456789")
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Invalid token");
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send an error with status 401 because not send access token", (done) => {
        request(app)
          .get("/users")
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Invalid token");
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send an error with status 401 because wrong id in access token", (done) => {
        request(app)
          .get("/users")
          .set("access_token", wrongAccessToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Data not found");
            expect(res.status).toBe(404);
            done();
          });
      });
    });
  });
});
