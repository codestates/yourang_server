import express from "express";
export class SchedulesController{

    //세부일정들 가져오기
    public getSchedules:Function = async (req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공");
    }

    //세부일정들 저장
    public setSchedule:Function = async(req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공");
    }
}