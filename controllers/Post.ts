import {IGetUserAuthInfoRequest} from "../types"
import { Response } from "express"
export function getPostComments(req:IGetUserAuthInfoRequest,res:Response){
    console.log()

}

export async function postComment(req:IGetUserAuthInfoRequest,res:Response){

}


export async function createPost(req:IGetUserAuthInfoRequest,res:Response){
    
    console.log(req.user);
    res.send(req.user);
}


