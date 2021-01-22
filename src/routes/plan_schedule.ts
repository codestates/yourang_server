import express from "express";
import controller from "../controller/"
export const router:express.Router = express.Router();
const api = new controller.plan_schedule.SchedulesController();

//GET schedule/get
router.get("/get",api.getSchedules);
//POST schedule/set
router.post("/set",api.setSchedule);