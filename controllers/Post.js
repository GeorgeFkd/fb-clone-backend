module.exports.getPostComments = function (req, res) {
    //SELECT * FROM comments WHERE post_id = {req.params.postid}
    //i can then flat it out to get names and stuff
};

module.exports.postComment = async function (req, res) {
    //INSERT INTO comments (post_id,content,author_id,replies_to) VALUES($1,$2,$3,$4)
};

module.exports.createPost = async function (req, res) {
    //get the data by req.body form
    //INSERT INTO posts (author_id,content,group_name) VALUES($1,$2,$3)
    console.log(req.user);
    res.send(req.user);
};
