const PoolDB = require("pg").Pool;
const request = require("supertest");
const client = require("../db.js");
let expect = require("chai").expect;
let assert = require("chai").assert;
let should = require("chai").should();
// functions tested

describe("Facebook Api", function () {
  let app, pool;

  before("mock db connection and load app", async function (done) {
    pool = new PoolDB({
      user: "postgres",
      password: "root",
      host: "localhost",
      port: 5432,
      database: "facebook",
      max: 1,
      idleTimeoutMillis: 0,
    });
    try {
      client.query = (text, values) => {
        return pool.query(text, values);
      };

      app = require("../index");
      done();
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  describe("GET /groups", function () {});

  describe("POST /users/register", function () {
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
        .set("Content-type", "application/json")
        .send(req)
        .expect(201)
        .end((err, res) => {
          console.log(res);
          if (err) done(err);

          done();
        });
    });
  });

  describe("POST /posts", function () {
    //it is ok
    const commentObject = {
      post_id: 15,
      author_id: 4,
      content: "send help",
    };
    before("Post a comment on an existing post", async function () {
      console.log("hey noob");
      await pool.query(
        "INSERT INTO comments (post_id,author_id,content) VALUES($1,$2,$3)",
        [commentObject.post_id, commentObject.author_id, commentObject.content]
      );
    });
    it("gets comments of a certain post", function (done) {
      request(app)
        .get(`/posts/${commentObject.post_id}/comments`)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);

          let commentsArray = res.body.postComments;
          assert.isArray(commentsArray);
          commentsArray = commentsArray.map((comment) => {
            return {
              post_id: comment.post_id,
              author_id: comment.author_id,
              content: comment.content,
            };
          });
          console.log(commentsArray, commentObject);
          const index = commentsArray.find((comment) => {
            return isEqual(comment, commentObject);
          });
          console.log(index, "flag");
          assert.isDefined(index, "Didnt find anything");

          done();
        });
    });
  });
});

function isEqual(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) return false;

  for (let objKey of obj1Keys) {
    if (obj1[objKey] !== obj2[objKey]) {
      return false;
    }
  }

  return true;
}
