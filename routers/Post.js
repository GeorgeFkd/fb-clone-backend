const router = require("express").Router();

const {
  createPost,
  postComment,
  getPostComments,
  getCommentReplies,
} = require("../controllers/Post");
const verifyJwt = require("../verifyJwtToken");
// will go to separate router probably
router.get("/comment/:comment_id/replies", getCommentReplies);
router.get("/:id/comments", getPostComments);
router.post("/:id/newcomment", verifyJwt, postComment);
router.post("/new", verifyJwt, createPost);
module.exports = router;
