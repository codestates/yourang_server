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
        .catch(err=>res.status(400).json({message:"Invaild ID or Password",error:err}));
        
        if(userInfo){
            const access_token = this.jwt.getAccessToken(userInfo);
            const refresh_token = this.jwt.getRefreshToken(userInfo);
            res.cookie('refreshToken',refresh_token,{
                httpOnly:true,
                secure:true,
                sameSite:'none',
                domain:"localhost:3000",
                maxAge: 24*6*60*10000
            });
            res.status(200).json({data:{accessToken:access_token},message:"Login Successed"});
        }
        return;
    }

    public logOut:Function = async (req:express.Request,res:express.Response)=>{
        const authorization = req.body.authorization;
        
        if(authorization){
            res.cookie('maxAge',0)
            res.status(200).json({message:"Logout Success"});
        }else{
            res.status(400).json({message:"Bad Request"})
        }        
        return;
    }

    public signUp:Function = async (req:express.Request,res:express.Response)=>{
        const {body} = req;
        await user.create({
            user_id : body.id,
            password : body.password,
            email : body.email,
            phone : body.phone,            
        })
        .then(()=>res.status(200).json({message:"Signup Success"}))
        .catch((err)=>res.status(400).json({message:"Failed to Signup"}));
        return;
    }

    public getUserInfo:Function = async (req:express.Request,res:express.Response)=>{
        const authorization = req.body.authorization;
        
        if(authorization){            
            let userInfo = this.jwt.Verify(authorization);
            res.status(200).json({data:userInfo});
        }else{
            res.redirect("https://localhost:3000/main");
        }
        return;
    }

    public modifyUserInfo:Function = async (req:express.Request,res:express.Response)=>{
        const {body}=req
        let flag;
        if(body.authorization){
            let id = this.jwt.Verify(body.authorization).id;            
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
                .catch(err=>res.status(400).json({message:err}));
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
                .catch(err=>res.status(400).json({message:err}))
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
                    res.status(200).json({data:{accessToken:access_token},message:"Successfully Modify"});
                    
                });
            }
        }else{
            res.status(401).json({message:"Unauthorized Token"});
        }
        return;
    }
    public withdraw:Function = async (req:express.Request,res:express.Response)=>{
        const {authorization,password} = req.body;
        if(authorization){
            const {user_id,id} = this.jwt.Verify(authorization);
            await user.destroy({
                where:{
                    id:id,
                    user_id:user_id,
                    password:password
                }
            })
            .then(()=>res.status(200).json({message:"Withdraw Successful"}))
            .catch((err)=>res.status(400).json({message:err}));
        }else{
            res.redirect("https://localhost:3000/main");
        }
        
        return;
    }

    public checkId:Function = async(req:express.Request,res:express.Response)=>{
        const {id} = req.body;
        if(id){
            await user.findOne({
                where:{
                    user_id:id
                }
            }).then(()=>res.status(202).json({result:true}))
            .catch(()=>res.status(202).json({result:false}));
        }
        return;
    }
    public checkEmail:Function = async(req:express.Request,res:express.Response)=>{
        const {email} = req.body
        if(email){
            await user.findOne({
                where:{
                    email:email
                }
            })
            .then(()=>res.status(202).json({result:true}))
            .catch(()=>res.status(202).json({result:false}));
        }
    }
}