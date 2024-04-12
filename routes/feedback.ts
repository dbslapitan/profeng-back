import { Router } from "express";
import { getAllFeedback, postReadingFeedback } from "../controllers/feedback";

export const router = Router();

router.get('/', getAllFeedback);

router.post('/reading', postReadingFeedback);