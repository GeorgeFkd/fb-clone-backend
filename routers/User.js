const {
  getUserFriends,
  getUserPosts,
  registerUser,
  loginUser,
  logoutUser,
  getUserGroups,
  getCurrentUserGroups,
  getCurrentUserFriends,
} = require("../controllers/User");
const verifyJwt = require("../verifyJwtToken");

const express = require("express");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me/groups", verifyJwt, getCurrentUserGroups);
router.get("/me/friends", verifyJwt, getCurrentUserFriends);
router.get("/me/posts", verifyJwt, getCurrentUserFriends);
router.get("/:id/friends", getUserFriends);
router.get("/:id/groups", getUserGroups);

//router.post("/newpost",verifyJwt,createPost)
router.get("/:id/posts", getUserPosts);

module.exports = router;
