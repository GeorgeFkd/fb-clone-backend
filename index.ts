const express = require("express");
const app = express();
const cors = require("cors");
import poolDB from "./db"
import UserRouter from "./routers/User"
import PostRouter from "./routers/Post"
app.use(cors());

app.use(express.json());


app.use('/user',UserRouter);
app.use('/post',PostRouter);

app.listen(5000, () => {
    console.log("hello there");
});

//todo use env variables
//!to user_id einai int 





