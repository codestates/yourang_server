import express from "express";
import controller from "../controller";
export const router:express.Router = express.Router();
const api = new controller.category.CategoryController();

//GET /category/get
router.get("/get", api.getCategory);
//POST /category/set
router.post("/set",api.setCategory);