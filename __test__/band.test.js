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

let bandProfile = {
  name: "Dream Theater",
  description: "Prog Metal band located somewhere in America",
  location: "Jakarta",
  genre: ["Metal"],
  rate: 1000000,
};

let emptyInput = {
  name: "",
  desciption: "",
  location: "",
  genre: [],
  rate: 0,
};

describe("User routes", () => {
  let bandToken, clientToken, bandId;
  beforeAll((done) => {
    User.create(dataBand)
      .then((band) => {
        bandId = band.id;
        bandToken = generateToken(
          { id: band.id, email: band.email },
          "BandlySecret"
        );
        return User.create(dataClient);
      })
      .then((client) => {
        clientToken = generateToken(
          { id: client.id, email: client.email },
          "BandlySecret"
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
  //Create
  describe("POST /users", () => {
    //Success create
    describe("Success process", () => {
      test("should create band profile with status code 201", (done) => {
        request(app)
          .post("/users")
          .send(bandProfile)
          .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("band", res.body.band);
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
            expect(res.body.band).toHaveProperty("rate", bandProfile.rate);
            expect(res.status).toBe(201);
            done();
          });
      });
    });
    //Error create
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

  //Read User
  describe("GET /users", () => {
    //Success read
    describe("Success process", () => {
      test("should send all registered band data with status 200", (done) => {
        request(app)
          .get("/users")
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("bands", expect.any(Array));
            done();
          });
      });
      test("should send one band data with status 200", (done) => {
        request(app)
          .get("/users/" + bandId)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("UserId", bandId);
            expect(res.body).toHaveProperty("name", bandProfile.name);
            expect(res.body).toHaveProperty(
              "description",
              bandProfile.description
            );
            expect(res.body).toHaveProperty("location", bandProfile.location);
            expect(res.body).toHaveProperty("genre", expect.any(Array));
            expect(res.body).toHaveProperty("portofolio", expect.any(Array));
            expect(res.status).toBe(200);
            done();
          });
      });
      //Error Read
      describe("Error process", () => {
        test("should send error with status 404 because of invalid UserId", (done) => {
          request(app)
            .get(`users/${bandId + 2}`)
            .end((err, res) => {
              expect(err).toBe(null);
              expect(res.body).toHaveProperty("message", expect.any(Array));
              expect(res.body.message).toContain("404: Error not Found");
              expect(res.status).toBe(404);
              done();
            });
        });
      });
    });
  });

  //Update Users
  describe("UPDATE /users", () => {
    let updatedProfile = {
      name: "Kangen Band",
      description: "Metal band located in Jakarta",
      location: "Jakarta",
      genre: "Metal",
      rate: 1500000,
    };

    //Success Update
    describe("Success Process", () => {
      test("should send Update message with status 200", (done) => {
        request(app)
          .put(`users/${bandId}`)
          .send(updatedProfile)
          .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty(
              "message",
              "Profile update success"
            );
            expect(res.status).toBe(200);
            done();
          });
      });
    });
    //Error Update
    describe("Error Process", () => {
      test("should send error message with status 401 because of invalid accesss_token", (done) => {
        request(app)
          .put(`users/${bandId}`)
          .send(updatedProfile)
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
      test("should send error message with status 401 because of access_token is not included", (done) => {
        request(app)
          .put(`users/${bandId}`)
          .send(updatedProfile)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("No access_token");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send error message with status 400 because of empty input validation", (done) => {
        request(app)
          .put(`users/${bandId}`)
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
});
