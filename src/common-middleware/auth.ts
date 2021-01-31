import express from "express";
import {config} from 'dotenv';
config();
const jwt = require("jsonwebtoken");
export default class Auth{
    public Verify:Function = (authorization)=>{
        
        if(authorization){
            
            return jwt.verify(authorization,process.env.REFRESH_SECRET,
                (err,decoded)=>{
                    if(decoded){
                        return decoded;
                    }else{
                        return err;
                    }
            });
        }
    }    

    public getRefreshToken:Function=(userInfo)=>{
        const refresh_token = jwt.sign({
            id:userInfo.id,
            user_id:userInfo.user_id,
            email:userInfo.email,
            phone:userInfo.phone,
            photo:userInfo.photo,
            updatedAt:userInfo.updatedAt
        },process.env.REFRESH_SECRET,{expiresIn:"1days"});
        return refresh_token;
    }
}