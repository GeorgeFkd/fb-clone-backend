const { poolDB } = require("../db");

//all these work properly

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
    commentsDbReturn = await poolDB.query(
      "SELECT * FROM comments WHERE post_id = $1;",
      [req.params.id]
    );
  } catch (err) {
    console.error(err);
  }
  console.log(commentsDbReturn.rows);
  res.json({ postComments: commentsDbReturn.rows });
  //SELECT * FROM comments WHERE post_id = {req.params.postid}
  //i can then flat it out to get names and stuff
};

module.exports.postComment = async function (req, res) {
  let savedCommentDbReturn;
  console.log(req.params.id);
  try {
    savedCommentDbReturn = await poolDB.query(
      "INSERT INTO comments (post_id,content,author_id,replies_to) VALUES($1,$2,$3,$4)",
      [
        req.params.id,
        req.body.content,
        req.user._id,
        req.body.replies_to || null,
      ]
    );
  } catch (error) {
    console.error(error);
  }

  res.status(201).send("Comment succesfully posted");
};

module.exports.createPost = async function (req, res) {
  //get the data by req.body form
  //INSERT INTO posts (author_id,content,group_name) VALUES($1,$2,$3)
  console.log(req.user);
  const { content, group_name } = req.body;
  let insertPostDbReturn;
  try {
    insertPostDbReturn = await poolDB.query(
      "INSERT INTO posts (author_id,content,group_name) VALUES($1,$2,$3)",
      [req.user._id, content, group_name]
    );
  } catch (err) {
    console.error(err);
  }
  console.log(insertPostDbReturn);
  res.send(req.user);
};
