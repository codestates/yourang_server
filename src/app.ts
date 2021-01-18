import express from "express";
import cors from 'cors';
import logger from 'morgan';

export const app = express();


app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const corsOption : object ={
    origin: true,
    credentials: true,
    header:["Content-Type,authorization"],
    methods: ["GET","POST","OPTIONS"]
}

app.use(cors(corsOption));
app.get("/",(req,res)=>res.send("Hi from Server!"));
