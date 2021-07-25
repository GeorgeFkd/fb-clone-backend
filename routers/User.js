// import {
//     getUserFriends,
//     getUserPosts,
//     registerUser,
//     loginUser,
// } from "../controllers/User";
const {
    getUserFriends,
    getUserPosts,
    registerUser,
    loginUser,
    logoutUser,
} = require("../controllers/User");

const express = require("express");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id/friends", getUserFriends);

//router.post("/newpost",verifyJwt,createPost)
router.get("/:id/posts", getUserPosts);

module.exports = router;
