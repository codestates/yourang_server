import axios from "axios";
import express from "express";
import dotenv from "dotenv"
dotenv.config();

export class MapSearchController{

    private GOOGLE_API = process.env.GOOGLE_API;

    public getPhotoForPlaces:Function = (req:express.Request,res:express.Response) => {
        const {place_ids} = req.body;
        
        Promise.all(place_ids.map(async id=>{            
            return await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,rating,photo,formatted_phone_number&key=${this.GOOGLE_API}`)
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
        const {lat,lng} =req.body;
        await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&language=ko&type=tourist_attraction&key=${this.GOOGLE_API}`)
        .then(data=>{
            res.status(200).json(data.data.results);
        })
        .catch(err=>res.status(400).json(err));
        return;
    }
    public getDetail:Function = async (req:express.Request,res:express.Response) => {
        const {placeId} = req.body;
        await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,photo,formatted_phone_number&key=${this.GOOGLE_API}`)
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

    public getPhotos:Function = async (req:express.Request,res:express.Response) => {
        const {photos} = req.body;
        let urls:any= [];
        await photos.forEach(async photo=>{
            let {photo_reference} = photo;
            let maxwidth = 400;
            await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photo_reference}&key=${this.GOOGLE_API}`)
            .then(data=>{
                urls.push(data.config.url);
            })
            .catch(err=>console.log(err));
        });
        if(urls.length){
            res.status(200).send({data:urls});
        }else{
            res.status(400).send({message:"Error occured"});
        }
    }

    
    
}