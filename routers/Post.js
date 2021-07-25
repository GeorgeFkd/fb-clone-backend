const router = require("express").Router();

const {
    createPost,
    postComment,
    getPostComments,
} = require("../controllers/Post");
const verifyJwt = require("../verifyJwtToken");

router.get("/:id/comments", getPostComments);
router.post("/:id/newcomment", verifyJwt, postComment);
router.post("/new", verifyJwt, createPost);
module.exports = router;
