const bcrypt = require("bcryptjs");
//! bcs of module.exports and not exp def
//import poolDB from "../db"
const { poolDB } = require("../db");

const jwtSecret = "my house is on fire";
const jwt = require("jsonwebtoken");

module.exports.getUserInfo = async function (req, res) {
  //we need his posts ,his comments along with post ids and we need his friends(requeststatus="accepted")
  //also his groups
  //gonna separate it
  try {
  } catch (error) {}
  let userGroups, userFriends, userPosts, userComments;

  try {
    userGroups = await poolDB.query(
      "SELECT group_id from isMemberOfGroup WHERE user_id=$1",
      [requestedUserId]
    );
  } catch (error) {
    console.error(error);
  }

  try {
  } catch (error) {
    console.error(error);
  }
};

module.exports.getUserFriends = function (req, res) {
  // SELECT name FROM users where user_id = (
  // SELECT user2 FROM areFriends where user1={req.user._id});
  console.log("hello");
};

module.exports.getUserPosts = function (req, res) {
  console.log("hello");
  //SELECT * FROM posts WHERE author_id = {req.user._id};
};

module.exports.registerUser = async function (req, res) {
  //todo if email already exists reject it
  //this saves the user properly in the database
  const salt = await bcrypt.genSalt(10);
  // //?
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  //todo save user to database
  console.log(user);
  try {
    const saved = await poolDB.query(
      "INSERT INTO users (name,email,password) VALUES ($1,$2,$3);",
      [req.body.name, req.body.email, hashedPassword]
    );
    console.log("success");
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send("something is missing");
  }
};

module.exports.loginUser = async function (req, res) {
  const user = await poolDB.query("SELECT * FROM users WHERE email=$1", [
    req.body.email,
  ]);
  if (!user) return res.status(401).send("Email or password is wrong");

  console.log(req.body.password, user.rows[0].password);
  let validPass;
  try {
    validPass = await bcrypt.compare(req.body.password, user.rows[0].password);
  } catch (error) {
    console.error(error);
  }
  if (!validPass) return res.status(401).send("Email or password is wrong");
  //todo jwtauth token
  console.log(user.rows[0]);
  const userObj = { _id: user.rows[0].user_id, name: user.rows[0].name };
  const token = jwt.sign(userObj, jwtSecret);
  res.set("auth-token", token);

  res.status(201).send(token);
};

module.exports.logoutUser = async function (req, res) {
  //? probably this is enough
  res.set("auth-token", "");
  res.status(200).send("succesfully logged out");
};
