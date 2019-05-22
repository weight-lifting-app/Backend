const db = require("../data/dbConfig");
const request = require("supertest");
const exercises = require("../exercises/exercises-router.js");
const server = require("../server.js");

describe("exercises", () => {
  beforeEach(async () => {
    await db("exercises").truncate();
  });

  it("sets the environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("returns a 200, OK", () => {
      return request(server)
        .get("/exercises")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("GET/:id", () => {
    it("returns a 200, OK", async () => {
      await request(server)
        .post("/exercises")
        .send({
          name: "Bench Press",
          user_id: 1,
          body_region: "chest",
          amount_lifted: "200",
          date: "yesterday"
        });

      const expected = await request(server).get("/exercises/1");
      expect(expected.status).toBe(200);
    });
  });

  describe("POST/", () => {
    it("returns a 201", async () => {
      const expected = await request(server)
        .post("/exercises")
        .send({
          name: "Chest Press",
          user_id: 1,
          body_region: "chest",
          amount_lifted: "190",
          date: "today"
        });
      expect(expected.status).toBe(201);
    });
  });

  describe("PUT /:id", () => {
    it("returns a 200, 0k on successful update", async () => {
      await request(server)
        .post("/exercises")
        .send({
          name: "Chest Press",
          user_id: 1,
          body_region: "chest",
          amount_lifted: "190",
          date: "today"
        });

      const expected = await request(server)
        .put("/exercises/1")
        .send({
          name: "Leg Press",
          user_id: 1,
          body_region: "legs",
          amount_lifted: "190",
          date: "today"
        });
      expect(expected.status).toBe(200);
    });
  });

  describe("DELETE /:id", () => {
    it("returns a 200, OK", async () => {
      await request(server)
        .delete("/exercises/2")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
