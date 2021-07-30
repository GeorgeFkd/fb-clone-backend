const { poolDB } = require("../db");

//all these work properly
const {
  GET_POST_COMMENTS_WITH_POSTID,
  INSERT_COMMENT_OF_POST,
  INSERT_NEW_POST,
} = require("../sql.queries");
module.exports.getCommentReplies = async function (req, res) {
  let commentRepliesDbReturn;
  try {
    commentRepliesDbReturn = await poolDB.query(
      "SELECT * from comments WHERE replies_to=$1",
      [req.params.comment_id]
    );
  } catch (error) {
    console.error(error);
  }

  res.status(200).send(commentRepliesDbReturn.rows);
};

module.exports.getPostComments = async function (req, res) {
  let commentsDbReturn;
  try {
    commentsDbReturn = await poolDB.query(GET_POST_COMMENTS_WITH_POSTID, [
      req.params.id,
    ]);
  } catch (err) {
    console.error(err);
  }
  console.log(commentsDbReturn.rows);
  res.status(200).json({ postComments: commentsDbReturn.rows });
  //SELECT * FROM comments WHERE post_id = {req.params.postid}
  //i can then flat it out to get names and stuff
};

module.exports.postComment = async function (req, res) {
  let savedCommentDbReturn;
  console.log(req.params.id);
  try {
    savedCommentDbReturn = await poolDB.query(INSERT_COMMENT_OF_POST, [
      req.params.id,
      req.body.content,
      req.user._id,
      req.body.replies_to || null,
    ]);
  } catch (error) {
    console.error(error);
  }

  res.status(201).send("Comment succesfully posted");
};

module.exports.createPost = async function (req, res) {
  //get the data by req.body form
  //INSERT INTO posts (author_id,content,group_name) VALUES($1,$2,$3)
  console.log(req.user, req.body);
  const { content, group_name } = req.body;
  console.log(content, group_name, req.user._id);
  let insertPostDbReturn;
  try {
    insertPostDbReturn = await poolDB.query(INSERT_NEW_POST, [
      req.user._id,
      content,
      group_name,
    ]);
  } catch (err) {
    console.error(err);
    return res.status(400).send("sth went wrong");
  }
  //console.log(insertPostDbReturn);
  res.status(201).send("Post was succesfully created");
};
