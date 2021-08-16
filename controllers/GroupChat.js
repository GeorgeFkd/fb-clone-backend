const { poolDB } = require("../db");
//! might need rename

//todo needs to check if user belongs in group
module.exports.getGroupChatMessages = async (req, res) => {
  try {
    const groupChatMessagesDbReturn = await poolDB.query(
      "SELECT * from groupchat_messages WHERE group_id=$1",
      [req.params.group_id]
    );
    const groupChatMessages = groupChatMessagesDbReturn.rows;
    res.status(200).json({
      groupChatMessages,
      message: "succesfully retrieved group messages",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      groupChatMessages: [],
      message: "retrieving group messages was unsuccesfull",
    });
  }
};

//jwtverify
module.exports.addNewGroupChatMessage = async (req, res) => {
  try {
    await poolDB.query(
      "INSERT INTO groupchat_messages(group_id,author_id,author_name,content) VALUES($1,$2,$3,$4)",
      [
        (req.params.group_id,
        req.user._id,
        req.user.name,
        req.body.message_content),
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

module.exports.deleteGroupChatMessage = async (req, res) => {
  try {
    await poolDB.query("DELETE from groupchat_messages WHERE message_id=$1", [
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

module.exports.editGroupChatMessage = async (req, res) => {};
