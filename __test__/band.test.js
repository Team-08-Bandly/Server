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
  name: "client name",
  email: "client@mail.com",
  password: "clientBand",
  accountType: "client",
};

// let bandProfile = {
//   name: "Dream Theater",
//   description: "Prog Metal band located somewhere in America",
//   location: "Jakarta",
//   imageUrl:
//     "https://i.pinimg.com/236x/c3/92/95/c392954f24c4b0d856ead3e126d5b955.jpg",
//   coverUrl:
//     "https://mmc.tirto.id/image/otf/880x495/2017/08/01/dreamtheater--youtube_ratio-16x9.jpg",
//   genre: [1, 2],
//   rate: 1000000,
// };
let bandProfile = {
  name: "Dream Theater",
  description: "Prog Metal band located somewhere in America",
  location: "Jakarta",
  genre: [1, 2],
  rate: 1000000,
};

let emptyInput = {
  name: "",
  description: "",
  location: "",
  imageUrl: "",
  coverUrl: "",
  genre: [],
  rate: 0,
};
let bandToken;
let clientToken;
let bandId;

describe("User routes", () => {
  beforeAll((done) => {
    User.create(dataBand)
      .then((band) => {
        bandToken = generateToken(
          { id: band.id, email: band.email, accountType: band.accountType },
          "BandlySecret"
        );
        return User.create(dataClient);
      })
      .then((client) => {
        clientToken = generateToken(
          {
            id: client.id,
            email: client.email,
            accountType: client.accountType,
          },
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
      .then(() => {
        sequelize.stop();
        done();
      })
      .catch((err) => done(err));
  });
  //Create
  describe("POST /bands", () => {
    //Success create
    describe("Success process", () => {
      test("should create band profile with status code 201", (done) => {
        request(app)
          .post("/bands")
          .field("name", bandProfile.name)
          .field("description", bandProfile.description)
          .field("location", bandProfile.location)
          .field("genre", bandProfile.genre)
          .field("rate", bandProfile.rate)
          .attach("imageUrl", "./2.png")
          .attach("coverUrl", "./2.png")
          .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null);
            console.log(res.body, "-----------------------");
            bandId = res.body.band.id;
            // console.log(res.body.band.id, "---------- yang mau di ambil");
            expect(res.body).toHaveProperty("band", res.body.band);
            expect(res.body.band).toHaveProperty("id", expect.any(Number));
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
            expect(res.body.band).toHaveProperty("genre", expect.any(Array));
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
          .post("/bands")
          .field("name", bandProfile.name)
          .field("description", bandProfile.description)
          .field("location", bandProfile.location)
          .field("genre", bandProfile.genre)
          .field("rate", bandProfile.rate)
          .attach("imageUrl", "./2.png")
          .attach("coverUrl", "./2.png")
          .set("access_token", clientToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Unauthorized account type");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send an error with status 401 because of access_token is not included", (done) => {
        request(app)
          .post("/bands")
          .field("name", bandProfile.name)
          .field("description", bandProfile.description)
          .field("location", bandProfile.location)
          .field("genre", bandProfile.genre)
          .field("rate", bandProfile.rate)
          .attach("imageUrl", "./2.png")
          .attach("coverUrl", "./2.png")
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Invalid token");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send an error with status 400 because empty field validation", (done) => {
        request(app)
          .post("/bands")
          .field("name", emptyInput.name)
          .field("description", emptyInput.description)
          .field("location", emptyInput.location)
          .field("genre", emptyInput.genre)
          .field("rate", emptyInput.rate)
          .attach("imageUrl", "./2.png")
          .attach("coverUrl", "./2.png")
          .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Band name cannot be empty");
            expect(res.body.message).toContain("Location cannot be empty");
            expect(res.body.message).toContain(
              "Rate cannot be less than 100000"
            );
            expect(res.body.message.length).toBeGreaterThan(0);
            // expect(res.body.message).toContain("Genre cannot be empty");
            expect(res.status).toBe(400);
            done();
          });
      });
    });
  });

  // //Read User
  describe("GET /bands", () => {
    //Success read
    describe("Success process", () => {
      test("should send all registered band data with status 200", (done) => {
        request(app)
          .get("/bands")
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("bands", expect.any(Array));
            done();
          });
      });
      test("should send one band data with status 200", (done) => {
        request(app)
          .get("/bands/" + bandId)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("id", bandId);
            expect(res.body).toHaveProperty("name", bandProfile.name);
            expect(res.body).toHaveProperty(
              "description",
              bandProfile.description
            );
            expect(res.body).toHaveProperty("location", bandProfile.location);
            expect(res.body).toHaveProperty("Genres", expect.any(Array));
            // expect(res.body).toHaveProperty("portofolio", expect.any(Array));
            expect(res.status).toBe(200);
            done();
          });
      });
      // //Error Read
      describe("Error process", () => {
        test("should send error with status 404 because of invalid BandId", (done) => {
          request(app)
            .get(`/bands/123456789`)
            .end((err, res) => {
              expect(err).toBe(null);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message");
              // expect(res.body).toHaveProperty("message", expect.any(Array));
              expect(res.body.message).toContain("Error not Found");
              expect(res.status).toBe(404);
              done();
            });
        });
      });
    });
  });

  //Update Users
  describe("UPDATE /bands", () => {
    let updatedProfile = {
      name: "Kangen Band",
      description: "Metal band located in Jakarta",
      location: "Jakarta",
      genre: [2, 3],
      rate: 1500000,
    };

    //Success Update
    describe("Success Process", () => {
      test("should send Update message with status 200", (done) => {
        request(app)
          .put(`/bands/`)
          .field("name", updatedProfile.name)
          .field("description", updatedProfile.description)
          .field("location", updatedProfile.location)
          .field("genre", updatedProfile.genre)
          .field("rate", updatedProfile.rate)
          .attach("imageUrl", "./2.png")
          .attach("coverUrl", "./2.png")
          .set("access_token", bandToken)
          .end((err, res) => {
            console.log(res.body, "-----------------update");
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
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
          .put(`/bands/`)
          .field("name", updatedProfile.name)
          .field("description", updatedProfile.description)
          .field("location", updatedProfile.location)
          .field("genre", updatedProfile.genre)
          .field("rate", updatedProfile.rate)
          .attach("imageUrl", "./2.png")
          .attach("coverUrl", "./2.png")
          .set("access_token", clientToken)
          .end((err, res) => {
            expect(err).toBe(null);
            // console.log(res.body, "-------------------ini");
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Unauthorized account type");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send error message with status 401 because of access_token is not included", (done) => {
        request(app)
          .put(`/bands/`)
          .field("name", updatedProfile.name)
          .field("description", updatedProfile.description)
          .field("location", updatedProfile.location)
          .field("genre", updatedProfile.genre)
          .field("rate", updatedProfile.rate)
          .attach("imageUrl", "./2.png")
          .attach("coverUrl", "./2.png")
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Invalid token");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send error message with status 400 because of empty input validation", (done) => {
        request(app)
          .put(`/bands/`)
          .field("name", emptyInput.name)
          .field("description", emptyInput.description)
          .field("location", emptyInput.location)
          .field("genre", emptyInput.genre)
          .field("rate", emptyInput.rate)
          .attach("imageUrl", "./2.png")
          .attach("coverUrl", "./2.png")
          .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message", expect.any(Array));
            expect(res.body.message).toContain("Band name cannot be empty");
            expect(res.body.message).toContain("Location cannot be empty");
            // expect(res.body.message).toContain("Genre cannot be empty");
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
