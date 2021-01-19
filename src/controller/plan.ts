import express from "express";
export class PlanController {
    //계획목록 가져오기
    public getPlanList:Function = async (req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공");
    }
    //계획 가져오기
    public getPlan:Function = async (req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공");
    }
    //계획 저장하기
    public setPlan:Function = async(req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공");
    }
}
