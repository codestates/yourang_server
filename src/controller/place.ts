import express from "express";

import place from "../db/models/place"

export class PlaceController {
    
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
        const {body} = req
        await place.create({
            category_Id:body.category_Id,
            place_name:body.place_name,
            address:body.address,
            number:body.number,
            explain:body.explain,
            photo:body.photo,
            lat:body.lat,
            lon:body.lon
        })
        .then(()=>res.status(200).send({message:"SuccessFully set place"}))
        .catch(err=>res.status(404).send({message:err}));
        return
    }
}