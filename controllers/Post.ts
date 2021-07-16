import {IGetUserAuthInfoRequest} from "../types"
import { Response,Request } from "express"
export function getPostComments(req:Request,res:Response){
    //SELECT * FROM comments WHERE post_id = {req.params.postid}
    //i can then flat it out to get names and stuff

}

export async function postComment(req:IGetUserAuthInfoRequest,res:Response){

    //INSERT INTO comments (post_id,content,author_id,replies_to) VALUES($1,$2,$3,$4)


}


export async function createPost(req:IGetUserAuthInfoRequest,res:Response){
    //get the data by req.body form 
    //INSERT INTO posts (author_id,content,group_name) VALUES($1,$2,$3)
    console.log(req.user);
    res.send(req.user);
}


