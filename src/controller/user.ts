import express from "express";
import user from "../db/models/user";
import bookmarked from "../db/models/bookmarked_place";
import plan from "../db/models/my_plan"
import JWT from "../common-middleware/auth";
import Multer from "../common-middleware/multer";
import axios from "axios";
export class UserController {
    private delete = new Multer().getDeletePhoto;
    private jwt = new JWT();
    private now:Date = new Date();
    private date:string = this.now.getFullYear()+"-"+
                    (this.now.getMonth()+1)+"-"+
                    this.now.getDate()+" "+
                    this.now.getHours()+":"+
                    this.now.getMinutes()+":"+
                    this.now.getSeconds();
    
    public logIn:Function = async (req:express.Request,res:express.Response)=>{
        const {id,password} = req.body;
        
        await user.findOne({
            where:{
                user_id:id,
                password:password
            }
        })
        .then(data=>{
            if(data){
                const refresh_token = this.jwt.getRefreshToken(data);                
                res.status(200).json({message:"Login Successed",authorization:refresh_token});
            }
        })
        .catch(err=>res.status(400).json({message:"Invaild ID or Password",error:err}));
        return;
    }

    public logOut:Function = async (req:any,res:express.Response)=>{
        const authorization = req.headers.authorization;
        if(authorization){
            res.status(200).json({message:"Logout Success",authorization:""});
        }else{
            res.status(400).json({message:"Bad Request"});
        }        
        return;
    }

    public signUp:Function = async (req:express.Request,res:express.Response)=>{
        const {body} = req;
        await user.create({
            user_id : body.id,
            password : body.password,
            email : body.email,
            photo : "src/image/photo.png",
            phone : body.phone,
        })
        .then(()=>{
            res.status(200).json({message:"Signup Success"});
        })
        .catch((err)=>res.status(400).json({message:"Failed to Signup",error:err}));
        return;
    }

    public getUserInfo:Function = async (req:any,res:express.Response)=>{
        const authorization = req.headers.authorization;
        
        if(authorization){
            let userInfo = this.jwt.Verify(authorization);
            await user.findOne({
                where:{
                    id:userInfo.id
                }
            })
            .then((data)=>{
                if(data){
                    res.status(200).json({data});
                }
            })
            .catch(err=>{
                res.status(400).json({message:"Invalid authorization",error:err});
            })
        }else{
            res.status(400).json({message:"Invalid authorization"});
        }
        return;
    }

    public modifyPhoto:Function = async (req,res:express.Response)=>{
        const {file}=req
        const authorization = req.headers.authorization;
        
        let flag;
        if(authorization){
            let id = this.jwt.Verify(authorization).id;
            
            let originPhoto;
            await user.findOne({
                where:{
                    id:id
                }
            })
            .then((data:any)=>originPhoto=data.photo)
            .catch(err=>{
                res.status(400).json({message:"Invalid Authorization",error:err});
                return;
            });
            console.log(file.location)
            //기존 프로필사진이 기본이미지가 아닐 때
            if(originPhoto!=="src/image/photo.png"){
                let deleted = this.delete(originPhoto);
                
            }
            await user.update({
                photo:file.location
            },{
                where:{
                    id:id
                }
            }).catch(err=>{
                res.status(400).json({message:err});
                return;
            });
            await user.findOne({
                where:{
                    id:id
                }
            }).then((data)=>{
                const refresh_token = this.jwt.getRefreshToken(data);
                res.status(200).json({message:"Successfully Modify",authorization:refresh_token});
            })
            .catch(err=>res.status(404).json({message:err}));
        }else{
            res.redirect("http://yourang.s3-website.ap-northeast-2.amazonaws.com/main")
        }
        return;
    }

    public modifyPassword:Function = async (req:any,res:express.Response)=>{
        const authorization = req.headers.authorization
        const {oriPassword,newPassword} = req.body;
        const id = this.jwt.Verify(authorization).id;
        if(id){
            await user.findOne({
                where:{
                    id:id,
                    password:oriPassword
                }
            }).then( async ()=>{
                await user.update({
                    password:newPassword
                },{
                    where:{
                        id:id,
                        password:oriPassword
                    }
                })
                .then(()=>res.status(200).json({message:"Modify Success!"}))
                .catch((err)=>{res.status(404).json({message:err})});
            })
            .catch(err=>res.status(404).json({message:err}));
        }else{
            res.redirect("http://yourang.s3-website.ap-northeast-2.amazonaws.com/main")
        }
        return;
    }
    
    public withdraw:Function = async (req:any,res:express.Response)=>{
        const {password} = req.body;
        const authorization = req.headers.authorization;
        if(authorization){
            const asd = this.jwt.Verify(authorization);
            await user.destroy({
                where:{
                    id:asd.id,
                    user_id:asd.user_id,
                    password:password
                }
            })
            .then(()=>{                
                res.status(200).json({message:"Withdraw Successful",authorization:""});
            })
            .catch((err)=>res.status(400).json({message:err}));
            
        }else{
            res.redirect("http://yourang.s3-website.ap-northeast-2.amazonaws.com/main");
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
            })
            .then((data)=>(data)?res.status(202).json({result:true}):res.status(202).json({result:false}))
            .catch(err=>res.status(400).json({message:err}));
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
            .then((data)=>(data)?res.status(202).json({result:true}):res.status(202).json({result:false}))
            .catch(err=>res.status(400).json({message:err}));
        }
        return;
    }
}