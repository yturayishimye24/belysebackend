import express from "express";
import { CreateEmail } from "../controllers/emailMeController.js";
const router = express.Router();

router.post("/create", CreateEmail)

export default router;