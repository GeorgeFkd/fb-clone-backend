const router = require("express").Router();
import {getUserFriends,getUserPosts,registerUser,loginUser} from "../controllers/User"
//const pool = require("./db");
import verifyJwt from "../verifyJwtToken"
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/:id/friends",getUserFriends);

//router.post("/newpost",verifyJwt,createPost)
router.get("/:id/posts",getUserPosts);


export default router;

