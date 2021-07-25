const PoolDB = require("pg").Pool;
const request = require("supertest");
const client = require("../db.js");
let expect = require("chai").expect;

// functions tested

describe("/users route", function () {
  let app;

  before("mock db connection and load app", async function (done) {
    const pool = new PoolDB({
      user: "postgres",
      password: "root",
      host: "localhost",
      port: 5432,
      database: "facebook",
      max: 1,
      idleTimeoutMillis: 0,
    });

    client.query = (text, values) => {
      return pool.query(text, values);
    };

    app = require("../index");
    done();
  });

  beforeEach("Create temporary tables", async function () {
    console.log("temp table");
    await client.query(
      "CREATE TEMPORARY TABLE users (LIKE users INCLUDING ALL)"
    );
  });

  afterEach("Drop temporary tables", async function () {
    console.log("nomore temp table");
    await client.query("DROP TABLE IF EXISTS pg_temp.users");
  });

  describe("POST /register", function () {
    it("Should save(register) the new user to the database", function (done) {
      const req = {
        body: {
          name: "lilChad",
          email: "me@gmail.com",
          password: "1234",
        },
      };
      console.log("hello bitch");
      request(app)
        .post("/users/register")
        .send(req)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });
  });

  describe("POST /posts", function () {
    it("gets comments of a certain post", function () {
      request(app)
        .get("/posts/3/comments")
        .expect(200)
        .end((err, res) => {
          done();
        });
    });
  });
});
