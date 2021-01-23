import express from "express";
import bookmarked from "../db/models/bookmarked_place";
import JWT from "./jwt";
export class BookMarkController {
    private jwt = new JWT();
    private userId!:string;
    private authorization!:string;
    
    public getBookMarkList:Function = async (req:express.Request,res:express.Response)=>{                
        this.authorization = req.body.authorization;
        if(this.authorization){
            this.userId = this.jwt.Verify(this.authorization).id;
        }
        await bookmarked.findAll({
            where:{
                userId:this.userId
            }
        })
        .then((data)=>res.status(200).send(data))
        .catch(err=>res.status(404).send(err));        
        return;
    }
    public setBookMark:Function = async (req:express.Request,res:express.Response)=>{
        if(this.authorization){
            if(this.authorization){
                this.userId = this.jwt.Verify(this.authorization).id;
            }
        }
        await bookmarked.create({
            userId:this.userId,
            placeId:req.body.placeId
        })
        .then((data)=>res.status(200).send(data))
        .catch(err=>res.status(404).send(err));
        return;
    }
}