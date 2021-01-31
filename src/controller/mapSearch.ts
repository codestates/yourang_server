import axios from "axios";
import express from "express";
import dotenv from "dotenv"
dotenv.config();

export class MapSearchController{

    private GOOGLE_API = process.env.GOOGLE_API;

    public getPhotoForPlaces:Function = (req:express.Request,res:express.Response) => {
        const {place_ids} = req.body;
        // console.log(req.body);
        
        Promise.all(place_ids.map(async id=>{
            return await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=geometry,vicinity,price_level,adr_address,name,rating,photo,formatted_phone_number,website,url,opening_hours&language=ko&key=${this.GOOGLE_API}`)
            .catch(err=>console.log(err));
        }))
        .then((values:any)=>{
            Promise.all(values.map(async (val)=>{
                
                if(val.data.result.photos){
                    let datas = await this.getPhoto(val,400);
                    return datas;
                }else{
                    return {detail:val.data,photoUrl:0}
                }
            })).then((datas:any)=>res.status(200).json(datas))
            .catch(err=>res.status(400).json({message:err}));
        })
        .catch(err=>console.log(err));
      
        return
    }

    public getLocation:Function = async (req:express.Request,res:express.Response) => {
        const {lat,lng} =req.body.data;
        const placeType = req.body.placeType
        await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&language=ko&type=${placeType}&key=${this.GOOGLE_API}`)
        .then(data=>{
            res.status(200).json(data.data.results);
        })
        .catch(err=>res.status(400).json(err));
        return;
    }
    public getDetail:Function = async (req:express.Request,res:express.Response) => {
        const {placeId} = req.body;
        await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,name,rating,photo,formatted_phone_number&key=${this.GOOGLE_API}`)
        .then(data=>{
            res.status(200).json(data.data);
        })
        .catch(err=>res.status(400).json({message:err}));
        return;
    }
    public getPhoto:Function = async (detail,maxwidth:number) => {
        let reference = detail.data.result.photos[0].photo_reference;
        return await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${reference}&key=${this.GOOGLE_API}`)
        .then((data)=>{
            return {detail:detail.data,photoUrl:data.config.url}
        })
        .catch(err=>console.log(err));
    }
}