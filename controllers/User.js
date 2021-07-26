const bcrypt = require("bcryptjs");
//! bcs of module.exports and not exp def
//import poolDB from "../db"
const { poolDB } = require("../db");

const jwtSecret = "my house is on fire";
const jwt = require("jsonwebtoken");

module.exports.getUserInfo = async function (req, res) {
  const user_id = await findUserIdByName(req.query.name);
  let userGroups, userFriends, userPosts, userComments;
};

module.exports.getUserGroups = async function (req, res) {
  const sqlStatement = "SELECT group_id from isMemberOfGroup WHERE user_id=$1";

  try {
    userGroups = await poolDB.query(
      sqlStatement,
      [requestedUserId]
    );
  } catch (error) {
    console.error(error);
  }
};
module.exports.getUserComments = async function (req, res) {
  let userCommentsDbReturn;
  const sqlStatement;
  try {
    userCommentsDbReturn = await poolDB.query("");
  } catch (error) {
    console.error(error);
    res.status(400).send("Couldnt get user comments");
  }
};
module.exports.getUserFriends = function (req, res) {
  // SELECT name FROM users where user_id = (
  // SELECT user2 FROM areFriends where user1={req.user._id});
  const sqlStatement = "SELECT name FROM users where user_id = (SELECT name from areFriends where user1=$1 and friendrequest_status='accepted')"

  let userFriendsDbReturn;
try {
     userFriendsDbReturn = await poolDB.query(sqlStatement,[req.query.user])
      res.status(200).send(userFriendsDbReturn.rows)
} catch (err) {
  
}  console.error(err)
};

module.exports.getUserPosts = function (req, res) {
  const sqlStatement = "SELECT * FROM posts WHERE author_id=$1";

  try {
    const userPostsDbReturn = await poolDB.query(sqlStatement,[req.params.id])

    res.status(200).json(userPostsDbReturn.rows)

  } catch (error) {
    console.error(error);
    res.status(400).send("The request for user posts failed")
  }
};

module.exports.registerUser = async function (req, res) {
  //todo if email already exists reject it
  //this saves the user properly in the database
  const existingUser = await poolDB.query("SELECT * FROM users where email=$1",[req.body.email])
  if(existingUser)return res.status(406).send(`User with email: ${req.body.email} already exists`)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };
  const sqlStatement = "INSERT INTO users (name,email,password) VALUES ($1,$2,$3);" 
  //todo save user to database
  console.log(user);
  try {
    const saved = await poolDB.query(
     sqlStatement,
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
  const sqlStatement = "SELECT * FROM users WHERE email=$1";

  const user = await poolDB.query(sqlStatement, [
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

async function findUserIdByName(name) {
  const sqlStatement = "SELECT user_id from users WHERE name=$1"

  const userDbReturn = await poolDB.query(
    sqlStatement,
    [name]
  );
  const user_id = userDbReturn.rows[0].user_id;
  return user_id;
}
