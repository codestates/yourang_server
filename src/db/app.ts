import {sequlize} from "./database";
import express from "express";

const app = express()

app.listen(8080, ()=>{
  console.log('DB connecting');
  sequlize.authenticate().then( async ()=>{
    console.log("database connected");
    try{
      await sequlize.sync( {force:true} )
    } catch (error){ console.log(error.message) }
  }).catch( (e:any) => {
    console.log(e.message);
  })
})