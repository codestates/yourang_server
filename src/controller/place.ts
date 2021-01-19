import express from "express";

export class PlaceController {
    //장소들 불러오기
    public getPlaces:Function = async(req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공");
    }
    
    //장소 불러오기
    public getPlace:Function = async(req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공");
    }

    //장소 저장하기
    public setPlace:Function = async(req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공");
    }
}