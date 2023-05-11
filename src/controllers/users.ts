import {Request, Response} from "express";
import * as dotenv from "dotenv";
dotenv.config();
import {db} from "../data/db.js";
import jwt from "jsonwebtoken";


const login = async(req: Request, res: Response) => {
    const {username, password} = req.body;
    const user = await db.one('SELECT * FROM users WHERE username=$1', username);
    
    if(user && user.password==password){
        const {SECRET=""} = process.env;
        const payload = {
            id:user.id, 
            username
        }
        const token = jwt.sign(payload, SECRET);
        console.log(token);
        await db.none("UPDATE users set token=$2 WHERE id = $1", [payload.id, token])
        res.status(200).json({token: token});
    }else{
        res.status(400).json({msg: 'Invalid username or password'});
    }
}

const signup= async( req:Request, res:Response) => {
    const {username,password} = req.body;
    const user = await db.oneOrNone(`SELECT * FROM users WHERE username = $1`, username);
    if(user){
        res.status(409).json({msg: "username already in use"})
    }else{
        await db.none("INSERT INTO users (username,password) VALUES ($1,$2)", [username, password])
        res.status(200).json({msg: "user signed-up"})
    }
}

const logout = async(req:Request, res:Response) => {
    const user:any = req.user;
    await db.none("UPDATE users SET token = $2 where id=$1", [user?.id, null])
    res.status(200).json({msg: "Logout successful"})
}

export {login, signup, logout};