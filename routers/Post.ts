const router = require("express").Router();
import { createPost,postComment,getPostComments } from "../controllers/Post";
import verifyJwt from "../verifyJwtToken"

router.get('/:id/comments',getPostComments);
router.post('/:id/newcomment',verifyJwt,postComment);
router.post('/new',verifyJwt,createPost)
export default router;
