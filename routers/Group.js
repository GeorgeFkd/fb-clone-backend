const router = require("express").Router();

const GroupController = require("../controllers/Group");
const verifyJwtToken = require("../verifyJwtToken");

//the user asks the group if he can join ,not the other way around
router.post(
  "/:id/adduser",
  verifyJwtToken,
  GroupController.addNewMemberPending
);
router.put("/:id/acceptuser", GroupController.addNewMemberPending);
router.get("/:id/members", GroupController.getMembersOfGroup);
// router.get("/:id");
router.get("/", GroupController.getAllGroups);

module.exports = router;
