import { Router } from "express";
import { getRandomReadingId, getSingleReading } from "../controllers/reading";

export const router = Router();

router.get('/', getRandomReadingId);

router.get('/:id', getSingleReading)