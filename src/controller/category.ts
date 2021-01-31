import express from "express";
import category from "../db/models//category";
export class CategoryController {
    
    public getCategory:Function = async(req:express.Request,res:express.Response)=>{
        await category.findOne({
            where:{
                id:req.body.id
            }
        })
        .then(data=>{
            res.status(200).send(data);
            return ;
        })
        .catch(err=>{
            res.status(404).send(err);
            return ;
        });
    }

    public setCategory:Function = async(req:express.Request,res:express.Response)=>{
        await category.create({
            category:req.body.category
        })
        .then(()=>res.status(200).send("Successfully create a category "))
        .catch(err=>res.status(404).send(err));
        return;
    }
} 