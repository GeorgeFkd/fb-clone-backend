const { poolDB } = require("../db");
//! might need rename

//todo needs to check if user belongs in group
module.exports.getChatMessages = async (req, res) => {
  try {
    const chatMessagesDbReturn = await poolDB.query(
      "SELECT * from chat_messages WHERE chat_id=$1",
      [req.params.chat_id]
    );
    const chatMessages = chatMessagesDbReturn.rows;
    res.status(200).json({
      chatMessages,
      message: "succesfully retrieved group messages",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      chatMessages: [],
      message: "retrieving group messages was unsuccesfull",
    });
  }
};

//jwtverify
module.exports.addNewChatMessage = async (req, res) => {
  try {
    await poolDB.query(
      "INSERT INTO chat_messages(chat_id,author_id,author_name,content) VALUES($1,$2,$3,$4)",
      [
        req.params.group_id,
        req.user._id,
        req.user.name,
        req.body.message_content,
      ]
    );

    res.status(201).json({
      message: "succesfully posted group messages",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "retrieving group messages was unsuccesfull",
      error,
    });
  }
};

module.exports.deleteChatMessage = async (req, res) => {
  try {
    await poolDB.query("DELETE from chat_messages WHERE message_id=$1", [
      req.params.message_id,
    ]);

    res.status(200).json({
      message: "succesfully deleted group message",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "deleting group message was unsuccesfull",
    });
  }
};

module.exports.editChatMessage = async (req, res) => {};
