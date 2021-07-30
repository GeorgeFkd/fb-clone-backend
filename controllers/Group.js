const { poolDB } = require("../db");
const {
  GET_GROUP_DETAILS_WITH_ID,
  GET_GROUPS_NAME_AND_ID,
  GET_MEMBERS_NAMES_OF_GROUP_WITH_ID,
  CREATE_NEW_GROUP,
  ADD_USER_IN_PENDING_LIST_OF_GROUP,
  ACCEPT_PENDING_USER_TO_GROUP,
} = require("../sql.queries");
module.exports.getPostsOfGroup = async (req, res) => {
  //todo db req
  let getPostsDbReturn;
  try {
    getPostsDbReturn = await poolDB.query(GET_GROUP_DETAILS_WITH_ID, [
      req.params.id,
    ]);

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
    allGroupsDbReturn = await poolDB.query(GET_GROUPS_NAME_AND_ID);
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
      GET_MEMBERS_NAMES_OF_GROUP_WITH_ID,
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

module.exports.addNewMemberPending = (req, res) => {
  try {
    const memberAddedDbReturn = await poolDB.query(
      ADD_USER_IN_PENDING_LIST_OF_GROUP,
      [req.body.group_id, req.user._id]
    );

    res
      .status(200)
      .send(
        `Your request to join the group ${req.body.group_id} was successfull`
      );
  } catch (error) {
    console.error(error);
    res.status(400).send("Couldnt request to join group");
  }
};

module.exports.acceptPendingMember = (req, res) => {
  try {
    const memberAcceptedDbReturn = await poolDB.query(
      ACCEPT_PENDING_USER_TO_GROUP,
      [req.user._id, req.body.group_id]
    );
    //! change this ,this only for postman
    res.status(200).send(memberAddedDbReturn);
    //res.status(200).send(`You accepted ${req.user.name} into your group successfully`)
  } catch (error) {
    console.error(error);
    res.status(400).send("Failed to accept pending member");
  }
};

module.exports.createNewGroup = (req, res) => {
  //verifyJwt middleware gives us req.user._id
  const user_id = req.user._id;
  console.log(user_id);
  try {
    const createGroupDbReturn = await poolDB.query(CREATE_NEW_GROUP, [
      user_id,
      req.body.name,
    ]);
    res.status(200).send(`Created ${req.body.name} group successfully`);
  } catch (error) {
    console.error(error);
    //handle differently if the error comes from jwt somehow to send different http status
    res.status(400).send("Failed to create group");
  }
};

function checkIfUserIsCreatorOfRespectiveGroup() {}
