import sequlize from "./database";
import express from "express";

const app = express()
console.log(sequlize)
app.listen(8080, ()=>{  
  sequlize.authenticate().then( async ()=>{    
    try{
      await sequlize.sync( {force:true} )
    } catch (error){ console.log(error.message) }
  }).catch( (e:any) => {
    console.log(e.message);
  })
})