import express from "express";
import controller from "../controller";
export const router:express.Router = express.Router();
const api = new controller.map.MapSearchController();

//POST /google/map
router.post("/map",api.getLocation);
//POST /google/detail
router.post("/detail",api.getDetail);
//POST /google/photo
router.post("/photo",api.getPhoto);
//POST /google/places_photo
router.post("/places_photo",api.getPhotoForPlaces);

