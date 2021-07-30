const bcrypt = require("bcryptjs");
//! bcs of module.exports and not exp def
//import poolDB from "../db"
const { poolDB } = require("../db");

const jwtSecret = "my house is on fire";
const jwt = require("jsonwebtoken");

const {
  GET_USERS_ALL_POSTS_WITH_ID,
  FIND_USER_WITH_EMAIL,
  INSERT_REGISTERED_USER,
  GET_USERS_ALL_POSTS_WITH_ID,
  GET_GROUPS_ID_OF_USER_WITH_ID,
  GET_USERS_ACCEPTED_FRIENDS_NAMES_WITH_HIS_ID,
} = require("../sql.queries");

// module.exports.getUserInfo = async function (req, res) {
//   const user_id = await findUserIdByName(req.query.name);
//   let userGroups, userFriends, userPosts, userComments;
// };

module.exports.getUserGroups = async function (req, res) {
  let userGroups;
  try {
    userGroups = await poolDB.query(GET_GROUPS_ID_OF_USER_WITH_ID, [
      requestedUserId,
    ]);
  } catch (error) {
    console.error(error);
  }
};
module.exports.getUserComments = async function (req, res) {
  let userCommentsDbReturn;
  const sqlStatement = "SELECT * FROM comments where author_id=$1";
  try {
    userCommentsDbReturn = await poolDB.query("");
  } catch (error) {
    console.error(error);
    res.status(400).send("Couldnt get user comments");
  }
};
module.exports.getUserFriends = async function (req, res) {
  let userFriendsDbReturn;
  try {
    userFriendsDbReturn = await poolDB.query(
      GET_USERS_ACCEPTED_FRIENDS_NAMES_WITH_HIS_ID,
      [req.query.user]
    );
    res.status(200).send(userFriendsDbReturn.rows);
  } catch (err) {}
  console.error(err);
};

module.exports.getUserPosts = async function (req, res) {
  try {
    const userPostsDbReturn = await poolDB.query(GET_USERS_ALL_POSTS_WITH_ID, [
      req.params.id,
    ]);
    res.status(200).json(userPostsDbReturn.rows);
  } catch (error) {
    console.error(error);
    res.status(400).send("The request for user posts failed");
  }
};

module.exports.registerUser = async function (req, res) {
  const existingUser = await poolDB.query(FIND_USER_WITH_EMAIL, [
    req.body.email,
  ]);
  console.log(existingUser.rows.length, req.body);
  if (existingUser.rows.length !== 0)
    return res
      .status(406)
      .send(`User with email: ${req.body.email} already exists`);
  const encryptionSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, encryptionSalt);
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };
  //! make the user somehow login immediately

  console.log(user);
  try {
    const savedUserToDb = await poolDB.query(INSERT_REGISTERED_USER, [
      req.body.name,
      req.body.email,
      hashedPassword,
    ]);
    console.log("success");
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send("something is missing");
  }
};

module.exports.loginUser = async function (req, res) {
  console.log(req.body, "here is the body");
  const user = await poolDB.query(FIND_USER_WITH_EMAIL, [req.body.email]);
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

  res.status(201).json({ token });
};

module.exports.logoutUser = async function (req, res) {
  //? probably this is enough
  res.set("auth-token", "");
  res.status(200).send("succesfully logged out");
};

async function findUserIdByName(name) {
  const sqlStatement = "SELECT user_id from users WHERE name=$1";

  const userDbReturn = await poolDB.query(sqlStatement, [name]);
  const user_id = userDbReturn.rows[0].user_id;
  return user_id;
}
