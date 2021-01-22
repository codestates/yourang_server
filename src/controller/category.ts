import express from "express";
import category from "../db/models//category";
export class CategoryController {
    
    public getCategory:Function = async(req:express.Request,res:express.Response)=>{
        console.log("시작");        
        await category.findOne({
            where:{
                id:req.body.id
            }
        })
        .then(data=>{      
            console.log(data)
            res.status(200).send(data);
            return ;
        })
        .catch(err=>{
            res.status(404).send(err);
            return ;
        });
    }

    public setCategory:Function = async(req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공")
    }
} 