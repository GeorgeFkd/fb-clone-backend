const bcrypt = require('bcryptjs')
import poolDB from "../db"
import {Request,Response } from "express"
import { Jwt } from "jsonwebtoken"
import {IGetUserAuthInfoRequest} from "../types"
const jwtSecret = "my house is on fire"
const jwt = require("jsonwebtoken")
export function getUserFriends(req:IGetUserAuthInfoRequest,res:Response){
    // SELECT name FROM users where user_id = (
    // SELECT user2 FROM areFriends where user1={req.user._id});
}

export function getUserPosts(req:Request,res:Response){
    //SELECT * FROM posts WHERE author_id = {req.user._id};
}

export async function registerUser(req:Request,res:Response){
    //todo if email already exists reject it
    //this saves the user properly in the database
     const salt = await bcrypt.genSalt(10);
    // //?
     const hashedPassword = await bcrypt.hash(req.body.password,salt)
    const user = {name:req.body.name,email:req.body.email,password:hashedPassword}

    //todo save user to database
    console.log(user);
    try {
        const saved = await poolDB.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3);",[req.body.name,req.body.email,hashedPassword])
        res.send(saved);
    } catch (error) {
        console.error(error)
    }

}

export async function loginUser(req:Request,res:Response){
 
    const user = await poolDB.query("SELECT * FROM users WHERE email=$1",[req.body.email]);
    if(!user)return res.status(400).send("Email or password is wrong");
    
    console.log(req.body.password,user.rows[0].password)
    let validPass;
    try {
         validPass = await bcrypt.compare(req.body.password,user.rows[0].password);

    } catch (error) {
        console.error(error);
    }
    if(!validPass)return res.status(400).send("Email or password is wrong");
    //todo jwtauth token 
    console.log(user.rows[0])
    const userObj = {_id:user.rows[0].user_id,name:user.rows[0].name}
    const token = jwt.sign(userObj,jwtSecret);
    res.set('auth-token',"Bearer " + token);
    res.send(token);
    
}

export async function logoutUser(req:IGetUserAuthInfoRequest,res:Response){
    //? probably this is enough
    res.set('auth-token','')
    res.status(200).send('succesfully logged out');
}










