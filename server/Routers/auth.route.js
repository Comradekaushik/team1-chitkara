import { Router } from "express";
import { logIn, signUp } from "../Controller/auth.controller.js";
const router = Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);


export default router;