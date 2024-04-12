import { Router } from "express";
import { postReadingFeedback } from "../controllers/feedback";

export const router = Router();

router.post('/reading', postReadingFeedback);