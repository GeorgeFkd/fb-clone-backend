//USERS
module.exports.GET_USER_COMMENTS_BY_HIS_ID = "";

//TODO ADD REQUEST STATUS
module.exports.GET_GROUPS_ID_OF_USER_WITH_ID =
  "SELECT group_id from isMemberOfGroup WHERE user_id=$1 AND participation_request_status='accepted'";

module.exports.GET_USERS_ACCEPTED_FRIENDS_NAMES_WITH_HIS_ID =
  //just need to remove the guy himself
  "SELECT name FROM users where user_id in (SELECT user1 from areFriends where (user1=$1 or user2=$1) and friendrequest_status='accepted') or user_id in (SELECT user2 from areFriends where (user1=$1 or user2=$1) and friendrequest_status='accepted' );";

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

module.exports.CREATE_NEW_GROUP =
  "INSERT INTO groups (creator_id,name) VALUES($1,$2)";

//ok
module.exports.GET_POSTS_OF_GROUP_WITH_ID =
  "SELECT posts.group_name,posts.createdAt,posts.content,users.name,posts.post_id FROM posts INNER JOIN users on posts.author_id=users.user_id INNER JOIN groups on groups.name=posts.group_name WHERE groups.group_id=$1";

module.exports.ACCEPT_PENDING_USER_TO_GROUP =
  "UPDATE isMemberOfGroup SET participation_request_status='accepted' WHERE user_id=$1 and group_id=$2 and creator_id=$3";

module.exports.ADD_USER_IN_PENDING_LIST_OF_GROUP =
  "INSERT INTO isMemberOfGroup (group_id,user_id,participation_request_status) VALUES($1,$2,'pending')";
