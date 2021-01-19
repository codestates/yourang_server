import express from "express"

export class BookMarkController {
    
    public getBookMarkList:Function = async (req:express.Request,res:express.Response)=>{
        
        return res.status(200).send("성공")
    }
    public setBookMark:Function = async (req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공")
    }
}