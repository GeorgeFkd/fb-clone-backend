//USERS
module.exports.GET_USER_COMMENTS_BY_HIS_ID = "";

//TODO ADD REQUEST STATUS
module.exports.GET_GROUPS_ID_OF_USER_WITH_ID =
  "SELECT group_id from isMemberOfGroup WHERE user_id=$1";

module.exports.GET_USERS_ACCEPTED_FRIENDS_NAMES_WITH_HIS_ID =
  "SELECT name FROM users where user_id IN (SELECT user2 from areFriends where user1=$1 and friendrequest_status='accepted')";

module.exports.GET_USERS_ALL_POSTS_WITH_ID =
  "SELECT * FROM posts WHERE author_id=$1";

module.exports.FIND_USER_WITH_EMAIL = "SELECT * FROM users where email=$1";

module.exports.INSERT_REGISTERED_USER =
  "INSERT INTO users (name,email,password) VALUES ($1,$2,$3);";
//POSTS
module.exports.GET_POST_COMMENTS_WITH_POSTID =
  "SELECT * FROM comments WHERE post_id = $1;";

module.exports.INSERT_COMMENT_OF_POST =
  "INSERT INTO comments (post_id,content,author_id,replies_to) VALUES($1,$2,$3,$4)";

module.exports.INSERT_NEW_POST =
  "INSERT INTO posts (author_id,content,group_name) VALUES($1,$2,$3)";

//GROUPS
module.exports.GET_GROUP_DETAILS_WITH_ID =
  "SELECT * from groups WHERE group_id=$1";

//?used for search
module.exports.GET_GROUPS_NAME_AND_ID = "SELECT group_id,name from groups";

module.exports.GET_MEMBERS_NAMES_OF_GROUP_WITH_ID =
  "SELECT name from users WHERE user_id in (SELECT user_id from isMemberOfGroup WHERE group_id=$1)";
