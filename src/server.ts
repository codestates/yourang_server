import dotenv from 'dotenv';
dotenv.config();
import {createServer} from 'https';
import app from "./app";
import {readFileSync} from "fs";
import sequelize from "./db/database"


const PORT = process.env.PORT;
const cert = readFileSync('../auth/cert.pem','utf-8');
const key = readFileSync('../auth/key.pem','utf-8');
const httpsServer = createServer(
        {
            key : key,
            cert : cert
        }
        ,app
    ).listen(PORT,()=>{
        sequelize.authenticate();
        console.log(`[Server] : Server is running at https://localhost:${PORT}`);
    });

module.exports = httpsServer;