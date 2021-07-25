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
    }).timeout(4000);
  });

  describe("POST /login", () => {
    beforeEach(async function () {
      const req = {
        body: {
          name: "lilChadgeon",
          email: "me@gmail.com",
          password: "1234",
        },
      };
      await client.query(
        "INSERT INTO pg_temp.users (name,email,password) VALUES($1,$2,$3)",
        [req.body.name, req.body.email, req.body.password]
      );
    });

    afterEach(async function () {
      await client.query("DELETE FROM pg_temp.users WHERE 1=1");
    });
    //     it("Should login the user with the correct password", async function () {
    //         const req = {
    //             body: {
    //                 email: "me@gmail.com",
    //                 password: "1234",
    //             },
    //         };
    //     });

    //     it("should reject the login due to wrong password and return a 401 error and an appropriate message", async function () {
    //         const req = {
    //             body: {
    //                 email: "me@gmail.com",
    //                 password: "123456",
    //             },
    //         };
    //     });

    //     it("should reject the login due to wrong email and return a 401 error and an appropriate message", async function () {
    //         const req = {
    //             body: {
    //                 email: "me@hotmail.com",
    //                 password: "1234",
    //             },
    //         };
    //         // it is the same no need to change
    //     });

    //     it("should check that there is an auth-token header after the successfull login", async function () {
    //         const req = {
    //             body: {
    //                 email: "me@gmail.com",
    //                 password: "123456",
    //             },
    //         };
    //     });
  });
});
