import express from "express";
import controller from "../controller"
export const router:express.Router = express.Router();
const api = new controller.user.UserController();
const token = new controller.token.JWTController();
import Multer from "../common-middleware/multer";
const upload = new Multer().getProfileUpload();

//POST user/login
router.post("/login",api.logIn);
//POST user/logout
router.post("/logout",api.logOut);
//POST user/signup
router.post("/signup",api.signUp);
//POST user/modify-profile
router.post("/modify-profile",upload.single('image'),api.modifyProfile);
//POST user/modify-pass
router.post("/modify-pass",api.modifyPassword)
//GET user/info
router.get("/info",api.getUserInfo);
//POST user/withdraw
router.post("/withdraw",api.withdraw);
//POST user/check_id
router.post("/check_id",api.checkId);
//POST user/check_email
router.post("/check_email",api.checkEmail);
//POST user/token
router.post("token",token.getToken);

