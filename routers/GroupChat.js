const router = require("express").Router();
const GroupChatsController = require("../controllers/GroupChat");
const verifyJwtToken = require("../verifyJwtToken");

router.use(verifyJwtToken);
router.delete(
  "/messages/:message_id",
  GroupChatsController.deleteGroupChatMessage
);
router.put(
  "/messages/:message_id",
  GroupChatsController.deleteGroupChatMessage
);
router.get("/:group_id/messages", GroupChatsController.getGroupChatMessages);
router.post("/:group_id/messages", GroupChatsController.addNewGroupChatMessage);

module.exports = router;
