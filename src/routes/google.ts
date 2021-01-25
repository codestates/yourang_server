import express from "express";
import controller from "../controller";
export const router:express.Router = express.Router();
const api = new controller.map.MapSearchController();

//GET /google/map
router.get("/map",api.getLocation);
//GET /google/detail
router.get("/detail",api.getDetail);
//GET /google/photo
router.get("/photo",api.getPhoto);
//GET /google/places_photo
router.get("/places_photo",api.getPhotoForPlaces);

