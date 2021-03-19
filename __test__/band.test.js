const request = require("supertest");
const app = require("../app");
const { sequelize, User, Band } = require("../models");
const { queryInterface } = sequelize;
const { generateToken } = require("../helpers/jwt");

let dataBand = {
  name: "test band",
  email: "band@mail.com",
  password: "anakBand",
  accountType: "band",
};

let dataClient = {
  email: "client@mail.com",
  password: "clientBand",
  accountType: "client",
};

describe("User routes", () => {
  let bandToken, clientToken;
  beforeAll((done) => {
    User.create(dataBand)
      .then((band) => {
        bandToken = generateToken(
          { id: band.id, email: band.email },
          "bandlySecret"
        );
        return User.create(dataClient);
      })
      .then((client) => {
        clientToken = generateToken(
          { id: client.id, email: client.email },
          "bandlySecret"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => queryInterface.bulkDelete("Bands", {}))
      .then(() => done())
      .catch((err) => done(err));
  });
  describe("POST /users", () => {
    let bandProfile = {
      name: "Dream Theater",
      desciption: "Prog Metal band located somewhere in America",
      location: "Jakarta",
      genre: "Metal",
      rate: 1000000,
    };

    let emptyInput = {
      name: "",
      desciption: "",
      location: "",
      genre: "",
      rate: 0,
    };
    describe("Success process", () => {
      test("should create band profile with status code 201", (done) => {
        request(app)
          .post("/users")
          .send(bandProfile)
          .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("Band", res.body.band);
            expect(res.body.band).toHaveProperty("id".expect.any(Number));
            expect(res.body.band).toHaveProperty("UserId", expect.any(Number));
            expect(res.body.band).toHaveProperty("name", bandProfile.name);
            expect(res.body.band).toHaveProperty(
              "description",
              bandProfile.description
            );
            expect(res.body.band).toHaveProperty(
              "location",
              bandProfile.location
            );
            expect(res.body.band).toHaveProperty("genre", bandProfile.genre);
            expect(res.body.band).toHaveProperty("fee", bandProfile.fee);
            expect(res.status).toBe(201);
            done();
          });
      });
    });
    describe("Error process", () => {
      test("should send an error with status 401 because of invalid access_token", (done) => {
        request(app)
          .post("/users")
          .send(bandProfile)
          .set("access_token", clientToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Unauthorized account type");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send an error with status 401 because of access_token is not included", (done) => {
        request(app)
          .post("/users")
          .send(bandProfile)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("No access_token");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send an error with status 400 because empty field validation", (done) => {
        request(app)
          .post("/users")
          .send(emptyInput)
          .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Band name cannot be empty");
            expect(res.body.message).toContain("Location cannot be empty");
            expect(res.body.message).toContain("Genre cannot be empty");
            expect(res.body.message).toContain(
              "Rate cannot be less than 100000"
            );
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
    });
  });
  describe("GET /users", () => {
    describe("Success process", () => {
      test("should send all registered band data band data with satatus 200", (done) => {
        request(app)
          .get("/users")
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("bands", expect.any(Array));
            done();
          });
      });
    });
  });
});
