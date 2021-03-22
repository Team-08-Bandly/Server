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

let filename = {
  file:
    "https://cdns.klimg.com/merdeka.com/i/w/news/2015/11/09/621048/540x270/di-sinilah-tempat-berkumpulnya-penggemar-musik-nirvana.mp3",
};

let bandToken;
let clientToken;
let userId;
let portoId;

beforeAll((done) => {
  User.create(dataBand)
    .then((band) => {
      bandToken = generateToken({
        id: band.id,
        email: band.email,
        accountType: band.accountType,
      });
      userId = band.id;
      return User.create(dataClient);
    })
    .then((client) => {
      clientToken = generateToken({
        id: client.id,
        email: client.email,
        accountType: client.accountType,
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
    .then(() => {
      done();
    })
    .catch((err) => done(err));
});

describe("Portofolio routes", () => {
  beforeAll((done) => {
    bandProfile.UserId = userId;
    Band.create(bandProfile)
      .then((band) => {
        bandId = band.id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  afterAll((done) => {
    queryInterface
      .bulkDelete("Bands", {})
      .then(() => queryInterface.bulkDelete("Bands", {}))
      .then(() => {
        sequelize.stop();
        done();
      })
      .catch((err) => done(err));
  });
  //Create
  describe("POST /bands/portofolio", () => {
    //success create
    describe("Success process", () => {
      test("should create portofolio with status code 201", (done) => {
        request(app)
          .post("/bands/portofolio")
          .attach("file", "./audio.wav")
          .set("access_token", bandToken)
          .end((err, res) => {
            portoId = res.body.id;
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("fileUrl");
            expect(res.body).toHaveProperty("portofolioType");
            expect(res.body).toHaveProperty("BandId");
            expect(res.status).toBe(201);
            done();
          });
      });
    });

    //Error create
    describe("Error process", () => {
      test("should send an error with status 401 because of invalid access_token", (done) => {
        request(app)
          .post("/bands/portofolio")
          .attach("file", "./audio.wav")
          .set("access_token", "123456789")
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
      test("should send an error with status 401 because of access_token is not included", (done) => {
        request(app)
          .post("/bands/portofolio")
          .attach("file", "./audio.wav")
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Invalid token");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send an error with status 401 because of wrong accountType", (done) => {
        request(app)
          .post("/bands/portofolio")
          .attach("file", "./audio.wav")
          .set("access_token", clientToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Unauthorized account type");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send an error with status 400 because of wrong format file type", (done) => {
        request(app)
          .post("/bands/portofolio")
          .attach("file", "./2.png")
          .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Wrong Format File Type");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
    });
  });
  describe("GET /bands/portofolio/:bandId", () => {
    //success get params bandId
    describe("Success proccess", () => {
      test("should return object from portofolio bandId with status 200", (done) => {
        request(app)
          .get("/bands/portofolio/" + bandId)
          // .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.status).toBe(200);
            done();
          });
      });
    });
    //error get params bandId
    describe("Error proccess", () => {
      test("should send error because not have portofolio with status 404", (done) => {
        request(app)
          .get("/bands/portofolio/" + (bandId + 1))
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
  describe("DELETE /bands/portofolio/:id", () => {
    //success
    describe("Success proccess", () => {
      test("should return object message with status 200", (done) => {
        request(app)
          .delete("/bands/portofolio/" + portoId)
          .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Success Deleting Portofolio");
            expect(res.status).toBe(200);
            done();
          });
      });
    });
    //error
    describe("Error proccess", () => {
      test("should send error because not input access token with status 401", (done) => {
        request(app)
          .delete("/bands/portofolio/" + portoId)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Invalid token");
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send error because input wrong access token with status 401", (done) => {
        request(app)
          .delete("/bands/portofolio/" + portoId)
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
      test("should send error because input wrong accountType with status 401", (done) => {
        request(app)
          .delete("/bands/portofolio/" + portoId)
          .set("access_token", clientToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Unauthorized account type");
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send error because not have portoId with status 404", (done) => {
        request(app)
          .delete("/bands/portofolio/" + (portoId + 1))
          .set("access_token", bandToken)
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
  describe("POST /bands/portofolio/url", () => {
    //success process
    describe("Success process", () => {
      test("should create portofolio with status code 201", (done) => {
        request(app)
          .post("/bands/portofolio/url")
          .send({ fileUrl: filename.file, portofolioType: 'video' })
          .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty("fileUrl");
            expect(res.body).toHaveProperty("portofolioType");
            expect(res.body).toHaveProperty("BandId");
            expect(res.status).toBe(201);
            done();
          })
      })
    })
    //error process
    describe("Error process", () => {
      test("should send an error with status 401 because of invalid access_token", (done) => {
        request(app)
          .post("/bands/portofolio/url")
          .send({ fileUrl: filename.file, portofolioType: 'audio' })
          .set("access_token", "123456789")
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
      test("should send an error with status 401 because of access_token is not included", (done) => {
        request(app)
          .post("/bands/portofolio/url")
          .send({ fileUrl: filename.file, portofolioType: 'audio' })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Invalid token");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send an error with status 401 because of wrong accountType", (done) => {
        request(app)
          .post("/bands/portofolio/url")
          .send({ fileUrl: filename.file, portofolioType: 'audio' })
          .set("access_token", clientToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Unauthorized account type");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(401);
            done();
          });
      });
      test("should send an error with status 400 because of wrong format file type", (done) => {
        request(app)
          .post("/bands/portofolio/url")
          .send({ fileUrl: filename.file, portofolioType: 'jpeg' })
          .set("access_token", bandToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Wrong Format File Type");
            expect(res.body.message.length).toBeGreaterThan(0);
            expect(res.status).toBe(400);
            done();
          });
      });
    });
  })
});
