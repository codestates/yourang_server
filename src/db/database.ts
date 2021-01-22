import {Sequelize} from "sequelize-typescript"
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.ts')[env];

 const sequlize = new Sequelize(config.database,config.username,config.password,{
    port:config.port,
    host: config.host,
    dialect: config.dialect,
    models: [__dirname+'/models'],    
});

export default sequlize;