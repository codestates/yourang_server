import axios from "axios";
import express from "express";
import user from "../db/models/user";
import JWT from "./jwt";
const {Op} = require("sequelize");
export class UserController {
    private jwt = new JWT();
    private now:Date = new Date();
    private date:string = this.now.getFullYear()+"-"+
                    (this.now.getMonth()+1)+"-"+
                    this.now.getDate()+" "+
                    this.now.getHours()+":"+
                    this.now.getMinutes()+":"+
                    this.now.getSeconds();
    public checkTest:Function = async(req:express.Request,res:express.Response)=>{
        const {body} = req;
        
        if(body.userId){
            await user.findOne({
                where:{
                    user_id:body.userId
                }
            }).then((data)=>{
                res.status(200);
                (data)?res.send(false):res.send(true);
            }).catch(err=>{
                res.status(404).send(err);
            })
            return;
        }else if(body.email){
            await user.findOne({
                where:{
                    email:body.email
                }
            }).then(data=>{
                res.status(200);                
                (data)?res.send(false):res.send(true);
            }).catch(err=>{
                res.status(404).send(err);
            })
            return;
        }
    }
    public logIn:Function = async (req:express.Request,res:express.Response)=>{
        
        let userInfo
        await user.findOne({
            where:{
                user_id:req.body.id,
                password:req.body.password
            }
        })
        .then(data=>{
            userInfo=data
        })
        .catch(err=>res.status(404).send({message:err}));
        
        if(!userInfo){
            res.status(400).send({data:null,message:"Invaild ID or Password"});
        }else{
            const access_token = this.jwt.getAccessToken(userInfo);
            const refresh_token = this.jwt.getRefreshToken(userInfo);
            res.cookie('refreshToken',refresh_token,{
                httpOnly:true,
                secure:true,
                sameSite:'none',
                domain:"localhost:3000",
                maxAge: 24*6*60*10000
            });
            res.status(200).send({data:{accessToken:access_token},message:"ok"});
        }
        return;
    }

    public logOut:Function = async (req:express.Request,res:express.Response)=>{
        const authorization = req.body.authorization;
        
        if(authorization){
            res.cookie('maxAge',0)
        }
        res.status(200).send("Logout Success");
        return;
    }

    public signUp:Function = async (req:express.Request,res:express.Response)=>{
        const {body} = req;
        await user.create({
            user_id : body.userId,
            password : body.password,
            email : body.email,
            phone : body.phone,            
        })
        .then(()=>res.status(200).send("Signup Successful"))
        .catch((err)=>res.status(404).send("Failed to Signup"));
        return;
    }

    public getUserInfo:Function = async (req:express.Request,res:express.Response)=>{
        const authorization = req.body.authorization;
        if(authorization){            
            let userInfo = this.jwt.Verify(authorization);
            res.status(200).send(userInfo);
        }else{
            res.status(404).redirect("")
        }
        return;
    }

    public modifyUserInfo:Function = async (req:express.Request,res:express.Response)=>{
        const {body}=req
        let flag;
        if(body.authorization){
            let id = this.jwt.Verify(body.authorization).id;
            console.log(id)
            if(body.password){
                flag = await user.update({
                    password:body.password,
                    phone:body.phone,
                    email:body.email,
                    updatedAt:this.date
                },{
                    where:{
                        id:id
                    }
                })
                .catch(err=>res.status(500).send(err));
            }else{
                flag = await user.update({
                    phone:body.phone,
                    email:body.email,
                    updatedAt:this.date
                },{
                    where:{
                        id:id
                    }
                })
            }
            if(flag[0]){
                await user.findOne({
                    where:{
                        id:id
                    }
                })
                .then( (data)=>{
                    const access_token = this.jwt.getAccessToken(data);
                    const refresh_token = this.jwt.getRefreshToken(data);
                    res.cookie('refreshToken',refresh_token,{
                        httpOnly:true,
                        secure:true,
                        sameSite:'none',
                        domain:"localhost:3000",
                        maxAge: 24*6*60*10000
                    });
                    res.status(200).send({data:{accessToken:access_token},message:"ok"});
                    return;
                });
            }
        }else{
            res.status(404).send("Should Login");
            return;
        }        
    }
    public withdraw:Function = async (req:express.Request,res:express.Response)=>{
        await user.destroy({
            where:{
                user_id:req.body.user_id,
                password:req.body.password
            }
        })
        .then(()=>res.status(200).send("Withdraw Successful"))
        .catch((err)=>res.status(400).send(err));
        return;
    }
}