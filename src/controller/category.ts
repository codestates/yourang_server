import express from "express";
export class CategoryController {
    public getCategory:Function = async(req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공")
    }

    public setCategory:Function = async(req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공")
    }
} 