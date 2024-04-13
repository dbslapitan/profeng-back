import { Router } from "express";
import { getAllFeedback, getSingleWritingFeedback, postReadingFeedback, postWritingFeedback } from "../controllers/feedback";

export const router = Router();

router.get('/', getAllFeedback);

router.get('/writing/:id', getSingleWritingFeedback);

router.post('/reading', postReadingFeedback);

router.post('/writing', postWritingFeedback);
