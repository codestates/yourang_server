import express from "express";
import {config} from 'dotenv';
import JWT  from "../common-middleware/auth"
import user from "../db/models/user";
config();

export class JWTController{

    private jwt = new JWT();

    public getToken = async(req:express.Request,res:express.Response)=>{
        const authorization = req.headers.authorization
        if(!authorization){
            res.status(400).json({data:null,message:"No accessToken contained in header"});
        }else{
            const data = this.jwt.Verify(authorization)
            let userInfo = await user.findOne({
                where:{
                    id:data.id,
                    user_id:data.user_id,
                    email:data.email
                }
            })

            if(!userInfo){
                res.status(404).json({message:"access token has been tempered"});
            }else{
                res.status(200).json({
                    data:{
                        
                    }
                })
            }
        }
    }
}