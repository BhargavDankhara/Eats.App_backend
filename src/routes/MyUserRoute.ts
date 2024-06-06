import express from "express";
import MyUserController from "../controllers/MyUserController";

const router = express.Router();

// api/my/user > on getting this post req this handler will be clled 
router.post("/", MyUserController.createCurrentUser);

export default router;