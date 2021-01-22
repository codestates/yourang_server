import express from "express";
import controller from "../controller"

export const router:express.Router = express.Router();

const api = new controller.place.PlaceController();

//GET place/list
router.get("/list",api.getPlaces);
//GET place/get
router.get("/get",api.getPlace);
//POST place/set
router.post("/set",api.setPlace);