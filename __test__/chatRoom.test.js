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

let bandProfile = {
  name: "Dream Theater",
  description: "Prog Metal band located somewhere in America",
  location: "Jakarta",
  genre: [1, 2],
  rate: 1000000,
};
let chatRoom = {
  BandId: 0,
  UserId: 0,
  RoomId: "1a2b3c4d5e",
};
let clientToken;

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
        chatRoom.UserId = client.id;
        clientToken = generateToken(
          {
            id: client.id,
            email: client.email,
            accountType: client.accountType,
          },
          "BandlySecret"
        );
        return Band.create({
          name: bandProfile.name,
          location: bandProfile.location,
          description: bandProfile.description,
          genre: bandProfile.genre,
          rate: bandProfile.rate,
          imageUrl: "./2.png",
          coverUrl: "./2.png",
        });
      })
      .then((newBand) => {
        chatRoom.BandId = newBand.id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  afterAll((done) => {
    queryInterface
      .bulkDelete("ChatRooms", {})
      .then(() => queryInterface.bulkDelete("Bands", {}))
      .then(() => queryInterface.bulkDelete("Users", {}))
      .then(() => {
        sequelize.stop();
        done();
      })
      .catch((err) => done(err));
  });

  //create
  describe("POST /chatRoom", () => {
    //Success create
    describe("Success process", () => {
      test("should create new chat room with status code 201", (done) => {
        request(app)
          .post("/chatRoom")
          .send(chatRoom)
          .set("access_token", clientToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty(
              "newRoomChat",
              res.body.newRoomChat
            );
            expect(res.body.newRoomChat).toHaveProperty(
              "id",
              expect.any(Number)
            );
            expect(res.body.newRoomChat).toHaveProperty(
              "UserId",
              chatRoom.UserId
            );
            expect(res.body.newRoomChat).toHaveProperty(
              "BandId",
              chatRoom.BandId
            );
            expect(res.body.newRoomChat).toHaveProperty(
              "RoomId",
              chatRoom.RoomId
            );
            done();
          });
      });
      test("should send chat room with status code 200", (done) => {
        request(app)
          .post("/chatRoom")
          .send(chatRoom)
          .set("access_token", clientToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("roomChat", res.body.roomChat);
            expect(res.body.roomChat).toHaveProperty("id", expect.any(Number));
            expect(res.body.roomChat).toHaveProperty("UserId", chatRoom.UserId);
            expect(res.body.roomChat).toHaveProperty("BandId", chatRoom.BandId);
            expect(res.body.roomChat).toHaveProperty("RoomId", chatRoom.RoomId);
            done();
          });
      });

      test("should send chat room with params BandId status code 200", (done) => {
        request(app)
          .get("/chatRoom/" + chatRoom.BandId)
          .set("access_token", clientToken)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              expect(err).toBe(null);
              expect(res.status).toBe(200);
              expect(typeof res.body).toContain("object");
              done();
            }
          });
      });
    });

    describe("Error process", () => {
      test("should send an error with status 401 because of access_token is not included", (done) => {
        request(app)
          .post("/chatRoom")
          .send(chatRoom)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Invalid token");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });

      test("should send error with status 404 because of invalid BandId", (done) => {
        request(app)
          .post("/chatRoom")
          .send({ ...chatRoom, BandId: 150 })
          .set("access_token", clientToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("message", expect.any(String));
            expect(res.body.message).toContain("Error not Found");
            expect(res.status).toBe(404);
            done();
          });
      });
    });
  });

  //get
  describe("GET /chatRoom", () => {
    //success
    describe("Success process", () => {
      test("should send chat room with status code 200", (done) => {
        request(app)
          .get("/chatRoom")
          .set("access_token", clientToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("roomChat", res.body.roomChat);
            expect(res.body.roomChat[0]).toHaveProperty(
              "id",
              expect.any(Number)
            );
            expect(res.body.roomChat[0]).toHaveProperty(
              "UserId",
              chatRoom.UserId
            );
            expect(res.body.roomChat[0]).toHaveProperty(
              "BandId",
              chatRoom.BandId
            );
            expect(res.body.roomChat[0]).toHaveProperty(
              "RoomId",
              chatRoom.RoomId
            );
            done();
          });
      });
    });
    describe("Error process", () => {
      test("should send an error with status 401 because of access_token is not included", (done) => {
        request(app)
          .get("/chatRoom")
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Invalid token");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
    });
  });
});
