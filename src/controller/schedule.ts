import express from "express";
import schedule from "../db/models/plan_schedule"
import axios from "axios";
export class SchedulesController{

    //세부일정들 가져오기
    public getSchedules:Function = async (req:express.Request,res:express.Response)=>{
        await schedule.findAll({
            where:{
                planId:req.body.planId
            }
        })
        .then(data=>{
            let planIdList:Array<Object> = []
            data.forEach(el=>{
                planIdList.push(el.placeId)
            })
            console.log(planIdList)
            res.send(200)
        })
        return;
    }

    //세부일정들 저장
    public setSchedule:Function = async(req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공");
    }
}