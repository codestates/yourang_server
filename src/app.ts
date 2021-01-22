import express from "express";
import cors from 'cors';
import logger from 'morgan';
import router from "./routes"
import axios from "axios";

const app:express.Application = express();

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
app.use(express.json());
app.use("/user",router.user.router);
app.use("/schedule",router.schedule.router);
app.use("/category",router.category.router);
app.use("/plan",router.plan.router);
app.use("/book",router.bookmark.router);
app.use("/place",router.place.router);

export default app;