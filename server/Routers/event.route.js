import { Router } from "express";
import { createEvent, registerEvent } from "../Controller/event.controller.js";
const router = Router();

router.post("/createEvent", createEvent);
router.post("/registerEvent", registerEvent)

export default router;