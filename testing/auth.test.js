const db = require("../data/dbConfig");
const request = require("supertest");
const users = require("../authorization/auth-router.js");
const server = require("../server.js");

describe("authorization", () => {
  beforeAll(async () => {
    await db("users").truncate();
  });

  describe("/REGISTER", () => {
    it("/register returns 201, success", () => {
      return request(server)
        .post("/auth/register")
        .send({ username: "patty", password: "pass" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("/register returns 401, requires username and password", () => {
      return request(server)
        .post("/auth/register")
        .send({ username: "austin" })
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it("/register returns a token", () => {
      return request(server)
        .post("/auth/register")
        .send({ username: "matt", password: "pass" })
        .then(res => {
          expect(res.body).toHaveProperty("token");
        });
    });
  });

  describe("/LOGIN", () => {
    it("/login returns a 200, success with valid credentials", () => {
      return request(server)
        .post("/auth/login")
        .send({ username: "patty", password: "pass" })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("/login returns a 401, with invalid credentials", () => {
      return request(server)
        .post("/auth/login")
        .send({ username: "austin", password: "pass" })
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it("/login returns a 500, with bad request credentials", () => {
      return request(server)
        .post("/auth/login")
        .send({ password: "austin", password: "pass" })
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });
});
