import express from "express";
import place from "../db/models/place"

export class PlaceController {
    
    //장소들 불러오기
    public getPlaces:Function = async(req:express.Request,res:express.Response)=>{
        // const placeIdList = req.body.placeId;
        // if(placeIdList.length){
        //     let datas=[]
        //     await placeIdList.forEach( async el=>{
                
        //         await place.findOne({
        //             where:{
        //                 id:el
        //             }
        //         })
        //         .catch(err=>res.status(404).send({message:err}))
                
        //     })            
        //     res.send(200)
        // }else if(req.body.category_Id){
        //     //항목으로 찾을때
        //     await place.findAll({
        //         where:{
        //             category_Id:req.body.category_Id
        //         }
        //     })
        //     .then(data=>res.status(200).send(data))
        //     .catch(err=>res.status(404).send({message:err}));            
        // }else{
        //     //전부 불러올때
        //     await place.findAll()
        //     .then(data=>res.status(200).send(data))
        //     .catch(err=>res.status(404).send({message:err}));            
        // }
        res.status(200).send("성공");
        return;
    }
    
    //장소 불러오기
    public getPlace:Function = async(req:express.Request,res:express.Response)=>{
        await place.findOne({
            where:req.body.placeId
        })
        .then(data=>res.status(200).send(data))
        .catch(err=>res.send({message:err}))
        return;
    }

    //장소 저장하기
    public setPlace:Function = async(req:express.Request,res:express.Response)=>{
        return res.status(200).send("성공");
    }
}