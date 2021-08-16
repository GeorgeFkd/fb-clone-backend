const router = require("express").Router();
const personalChatsController = require("../controllers/PersonalChat");
const verifyJwtToken = require("../verifyJwtToken");

router.use(verifyJwtToken);
router.delete(
  "/messages/:message_id",
  personalChatsController.deleteChatMessage
);
router.put("/messages/:message_id", personalChatsController.deleteChatMessage);
router.get("/:chat_id/messages", personalChatsController.getChatMessages);
router.post("/:chat_id/messages", personalChatsController.addNewChatMessage);
module.exports = router;
