const express = require("express");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const UserRouter = require("./routers/User");
const PostRouter = require("./routers/Post");
const GroupsRouter = require("./routers/Group");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/groups", GroupsRouter);
app.use("/users", UserRouter);
app.use("/posts", PostRouter);

app.use(function (err, req, res, next) {
  if (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

module.exports = app.listen(PORT, () => {
  console.log("hello there");
});

//todo use env variables
//!to user_id einai int
