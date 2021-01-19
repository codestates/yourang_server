import express from "express";

export class UserController {    

    public logIn:Function = async (req:express.Request,res:express.Response)=>{
        
        return res.status(200).send("성공")
    }

    public logOut:Function = async (req:express.Request,res:express.Response)=>{
        
        return res.status(200).send("성공")
    }

    public signUp:Function = async (req:express.Request,res:express.Response)=>{
        
        return res.status(200).send("성공")
    }

    public getUserInfo:Function = async (req:express.Request,res:express.Response)=>{
        
        return res.status(200).send("성공")
    }

    public modifyUserInfo:Function = async (req:express.Request,res:express.Response)=>{
        
        return res.status(200).send("성공")
    }
    public withdraw:Function = async (req:express.Request,res:express.Response)=>{
        
        return res.status(200).send("성공")
    }
}