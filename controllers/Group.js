const { poolDB } = require("../db");

module.exports.getPostsOfGroup = async (req, res) => {
  //todo db req
  let getPostsDbReturn;
  try {
    getPostsDbReturn = await poolDB.query(
      "SELECT * from groups WHERE group_id=$1",
      [req.params.id]
    );

    const actualPosts = getPostsDbReturn.rows;
    res.status(200).json({
      posts: actualPosts,
      message: "Succesfully retrieved group posts",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Request failed check console");
  }
};

module.exports.getAllGroups = async (req, res) => {
  //todo db req
  let allGroupsDbReturn;
  try {
    allGroupsDbReturn = await poolDB.query("SELECT group_id,name from groups");
    const actualGroups = allGroupsDbReturn.rows;
    res
      .status(200)
      .json({ groups: actualGroups, message: "Succesfully retrieved groups" });
  } catch (error) {
    console.error(error);
    res.status(400).send("Request for all groups failed");
  }
};

module.exports.getMembersOfGroup = async (req, res) => {
  let membersOfGroupDbReturn;
  try {
    //todo add request status
    //? works without request status yet
    membersOfGroupDbReturn = await poolDB.query(
      "SELECT name from users WHERE user_id in (SELECT user_id from isMemberOfGroup WHERE group_id=$1)",
      [req.params.id]
    );
    const membersArray = membersOfGroupDbReturn.rows;
    res.status(200).json({
      members: membersArray,
      message: "Succesfully retrieved members of group",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Retrieving members of group failed");
  }
  //todo db req
};

module.exports.addNewMemberPending = (req, res) => {};

module.exports.acceptPendingMember = (req, res) => {};
