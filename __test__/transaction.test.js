const request = require("supertest");
const app = require("../app");
const { sequelize, User, Band, Transaction } = require("../models");
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
let clientId;
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
      clientId = client.id;
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

let ratingReview = {
  rating: 4.4,
  review: "goooood",
};

let transactionId;

describe("Update Transaction", () => {
  beforeAll((done) => {
    console.log(bandId, "<<<<<<<<<<<<<<<<<<<<<<band id dari before all");
    Transaction.create({
      UserId: clientId,
      BandId: bandId,
      date: new Date(),
      duration: 2,
      address: "jakarta",
    })
      .then((data) => {
        console.log(data, "----------------------data dari transaction create");
        transactionId = data.id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  describe("PATCH /transactions/:id", () => {
    test("should update review and rating with status 200", (done) => {
      request(app)
        .patch("/transactions/" + transactionId)
        .send(ratingReview)
        .set("access_token", clientToken)
        .end((err, res) => {
          expect(err).toBe(null);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toContain("Success give rating & review");
          expect(res.status).toBe(200);
          done();
        });
    });
  });
  //error
  describe("Error review transaction", () => {
    test("should send error because of not input access_token with status 401", (done) => {
      request(app)
        .patch("/transactions/" + transactionId)
        .send(ratingReview)
        .end((err, res) => {
          expect(err).toBe(null);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toContain("Invalid token");
          expect(res.status).toBe(401);
          done();
        });
    });
    test("should send error because of wrong access_token with status 401", (done) => {
      request(app)
        .patch("/transactions/" + transactionId)
        .send(ratingReview)
        .set("access_token", bandToken)
        .end((err, res) => {
          expect(err).toBe(null);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toContain("Unauthorize access");
          expect(res.status).toBe(401);
          done();
        });
    });
    test("should send error because of transaction id not found with status 404", (done) => {
      request(app)
        .patch("/transactions/" + (transactionId + 1))
        .send(ratingReview)
        .set("access_token", clientToken)
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

describe("GET transaction by bandId", () => {
  describe("Success get transaction", () => {
    test("should return array transaction bandId with status 200", (done) => {
      request(app)
        .get("/transactions/" + bandId)
        .end((err, res) => {
          console.log(res.body, "-----------------ini");
          expect(err).toBe(null);
          expect(res.body).toHaveProperty("transactions", expect.any(Array));
          expect(res.status).toBe(200);
          done();
        });
    });
  });
});
