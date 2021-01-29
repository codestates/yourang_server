import express from "express";
import plan from "../db/models/my_plan";
import schedule from "../db/models/plan_schedule";
import JWT from "../common-middleware/auth";
export class PlanController {    
    private jwt = new JWT();
    //계획목록 가져오기
    public getPlanList:Function = async (req:any,res:express.Response)=>{
        const authorization = req.headers.authorization;
        if(authorization){
            let userId = await this.jwt.Verify(authorization).id;
            await plan.findAll({
                where:{
                    userId:userId
                }
            })
            .then(datas=>res.status(200).send(datas))
            .catch(err=>res.status(404).send(err));
        }
        return
    }
    //계획 수정
    public getPlan:Function = async (req:express.Request,res:express.Response)=>{
        await plan.findOne({
            where:{
                id:req.body.id
            }
        })
        .then(data=> res.status(200).send(data))
        .catch(err=>res.status(404).send(err));
        return 
    }
    //계획 저장하기
    public setPlan:Function = async(req:any,res:express.Response)=>{
        const {body} = req;
        const authorization = req.headers.authorization;      
        const userInfo = this.jwt.Verify(authorization);
        
        await plan.create({
            userId:userInfo.id,
            title:body.title
        })
        .then( data=>{            
            if(data){                
                body.placeIds.forEach(async (placeId)=>{
                    
                    await schedule.create({
                        planId:data.id,
                        placeId:placeId,
                        order:(body.placeIds.indexOf(placeId)+1)
                    });
                });
            }
        })
        .then(()=>res.status(200).send({message:"Successfull"}))
        .catch((err)=>res.status(404).send({message:err}));
        
        return;
    }
    
    //세부일정들 가져오기 = 계획보기
    public getSchedules:Function = async (req:any,res:express.Response)=>{
        const authorization = req.headers.authorization;
        if(!authorization){
            res.redirect("https://localhost:3000/main")
        }else{
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
                res.send(200)
            });
        }
        return;
    }
}
