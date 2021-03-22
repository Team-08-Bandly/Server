const request = require("supertest");
const app = require("../app");

describe("GET /genres/", () => {
  test("should send genres with status 200", (done) => {
    request(app)
      .get("/genres/")
      .end((err, res) => {
        expect(err).toBe(null);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("genres");
        expect(res.status).toBe(200);
        done();
      });
  });
});
