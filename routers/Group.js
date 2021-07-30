const router = require("express").Router();

const {
  getPostsOfGroup,
  getAllGroups,
  getMembersOfGroup,
} = require("../controllers/Group");

router.post("/:id/newuser/:user_id");
router.get("/:id/posts", getPostsOfGroup);
router.get("/:id/members", getMembersOfGroup);
// router.get("/:id");
router.get("/", getAllGroups);

module.exports = router;
