import {Request,Response,NextFunction} from "express"
const jwtsecret = 'my house is on fire';
const jwt = require("jsonwebtoken");
import {IGetUserAuthInfoRequest} from "./types"


//* this is middleware for protected stuff

export default function(req:IGetUserAuthInfoRequest,res:Response,next:NextFunction){
    const token = req.header("auth-token")
    
    if(!token)return res.status(401).send('Access Denied');
    try {
       console.log('hello')
       const verified = jwt.verify(token,jwtsecret);
       
       //! this might cause trouble 
       req.user = verified;
       next(); 
    } catch (error) {
        res.status(400).send('Invalid token')
    }

}