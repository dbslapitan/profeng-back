import { Router } from "express";
import { getAllFeedback, postReadingFeedback, postWritingFeedback } from "../controllers/feedback";

export const router = Router();

router.get('/', getAllFeedback);

router.post('/reading', postReadingFeedback);

router.post('/writing', postWritingFeedback)