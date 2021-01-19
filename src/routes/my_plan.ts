import express from "express";
import controller from "../controller";

export const router:express.Router = express.Router();

const api = new controller.my_plan.PlanController();

//GET /plan/list
router.get("/list",api.getPlanList);
//GET /plan/get
router.get("/get",api.getPlan);
//POST /plan/set
router.post("/set",api.setPlan);