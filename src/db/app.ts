import {sequlize} from "./database";
import express from "express";

const app = express()

app.listen(8080, ()=>{
  console.log('App runing at http://localhost8080')
  sequlize.authenticate().then( async ()=>{
    console.log("database connected");
    try{
      await sequlize.sync( {force:true} )
    } catch (error){ console.log(error.message) }
  }).catch( (e:any) => {
    console.log(e.message);
  })
})