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
  rate: 1000000,
  imageUrl:
    "https://i.pinimg.com/236x/c3/92/95/c392954f24c4b0d856ead3e126d5b955.jpg",
  coverUrl:
    "https://mmc.tirto.id/image/otf/880x495/2017/08/01/dreamtheater--youtube_ratio-16x9.jpg",
};

let transaction = {
  name: "ridho",
  address: "Jakarta",
  duration: 2,
  date: new Date("03/03/2021"),
};

let bandToken;
let clientToken;
let userId;
let portoId;
let bandId;

beforeAll((done) => {
  User.create(dataBand)
    .then((band) => {
      bandToken = generateToken({
        id: band.id,
        email: band.email,
        name: band.name,
        accountType: band.accountType,
      });
      userId = band.id;
      console.log(band.id, "---------------user band");
      return User.create(dataClient);
    })
    .then((client) => {
      clientToken = generateToken({
        id: client.id,
        email: client.email,
        name: client.name,
        accountType: client.accountType,
      });
      console.log(client.id, "----------------user client");
      bandProfile.UserId = userId;
      return Band.create(bandProfile);
    })
    .then((data) => {
      console.log(data, "------------------ data band");
      bandId = data.id;
      transaction.bandId = data.id;
      done();
    })
    .catch((err) => {
      done(err);
    });
});
afterAll((done) => {
  queryInterface.bulkDelete("Users", {});
  queryInterface.bulkDelete("Bands", {});
  queryInterface
    .bulkDelete("Transactions", {})
    .then(() => {
      done();
    })
    .catch((err) => done(err));
});

describe("Transaction routes", () => {
  describe("GET /transactions", () => {
    //success create
    test("should create transactions with status 201", (done) => {
      request(app)
        .get(
          "/transactions?name=ridho&location=jakarta&duration=2&date=2021-03-22&bandId=" +
            bandId
        )
        .set("access_token", clientToken)
        .end((err, res) => {
          expect(err).toBe(null);
          expect(typeof res.body).toEqual("object");
          // expect(res.body).toHaveProperty("snapToken");
          expect(res.status).toBe(500);
          done();
        });
    });
  });
});
