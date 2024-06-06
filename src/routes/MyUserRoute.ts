import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

// api/my/user > on getting this post req this handler will be clled 
router.post("/", jwtCheck, MyUserController.createCurrentUser);

export default router;