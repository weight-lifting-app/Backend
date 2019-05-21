const db = require("../data/dbConfig");
const request = require("supertest");
const users = require("../user/user-router.js");
const server = require("../server.js");

describe("user", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("GET /", () => {
    it("returns a 200, OK", () => {
      return request(server)
        .get("/user")
        .expect(200);
    });
    it("should return JSON using done callback", done => {
      // using the done callback
      request(server)
        .get("/user")
        .then(res => {
          expect(res.type).toBe("application/json"); // Content-Type
          done();
        });
    });
  });

  describe("GET /:id", () => {
    it("returns a 200, OK", async () => {
      await request(server)
        .post("/auth/register")
        .send({ username: "patt", password: "pass" });

      const expected = await request(server).get("/user/1");
      expect(expected.status).toBe(200);
    });
    it("should return JSON using done callback", done => {
      // using the done callback
      request(server)
        .get("/user/1")
        .then(res => {
          expect(res.type).toBe("application/json"); // Content-Type
          done();
        });
    });
  });

  describe("PUT /:id", () => {
    it("returns a 200, 0k on successful update", async () => {
      await request(server)
        .post("/auth/register")
        .send({ username: "patt", password: "pass" });

      const expected = await request(server)
        .put("/user/1")
        .send({ username: "pattx", password: "pass" });
      expect(expected.status).toBe(200);
    });

    it("returns a 404, bad request on invalid update id", async () => {
      await request(server)
        .post("/auth/register")
        .send({ username: "patt", password: "pass" });

      const expected = await request(server)
        .put("/user/3")
        .send({ username: "pattx", password: "pass" });
      expect(expected.status).toBe(404);
    });

    it("returns a 404 or 500?, bad request on update to incomplete endpoint", async () => {
      await request(server)
        .post("/auth/register")
        .send({ username: "patt", password: "pass" });

      const expected = await request(server)
        .put("/user")
        .send({ username: "pattx", password: "pass" });
      expect(expected.status).toBe(404);
    });
  });
});
