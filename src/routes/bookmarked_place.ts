import express from "express";
import controller from "../controller"
export const router:express.Router = express.Router();
const api = new controller.bookmarked_place.BookMarkController();

//GET /bookmark/get
router.get("/get",api.getBookMarkList);
//POST /bookmark/set
router.post("/set",api.setBookMark);
