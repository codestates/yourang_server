import {Sequelize} from "sequelize-typescript"
import express from "express";

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.ts')[env];

 const sequlize = new Sequelize(config.database,config.username,config.password,{
    port:config.port,
    host: config.host,
    dialect: config.dialect,
    models: [__dirname+'/models'],    
});

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