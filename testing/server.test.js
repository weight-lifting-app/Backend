const request = require("supertest");

const server = require("../server.js");

describe("server", () => {
  it("sets the environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  // open client, make a request and inspect the response
  describe("GET /", () => {
    it("should return 200 OK", () => {
      // we return the promise
      return request(server)
        .get("/")
        .expect(200);
    });
    it("should return provided message", () => {
      const expected = { message: "Hello from LambdaFit." };
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body).toEqual(expected);
        });
    });
  });
});
