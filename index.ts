import express from 'express';
import fs from 'fs';
import cors from 'cors';
import https from 'https';
import logger from 'morgan';

const PORT = process.env.PORT || 4000;
const cert = fs.readFileSync('../auth/cert.pem','utf-8');
const key = fs.readFileSync('../auth/key.pem','utf-8');

const app = express();

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const corsOption : object ={
    origin: true,
    credentials: true,
    methods: ["GET","POST","OPTIONS"]
}

app.use(cors(corsOption));
app.get("/",(req,res)=>res.send("Hi from Server!"));

const server = https
    .createServer(
        {
            key : key,
            cert : cert
        }
        ,app
    ).listen(PORT,()=>{
        console.log(`[Server] : Server is running at https://localhost:${PORT}`);
    });

module.exports = server;