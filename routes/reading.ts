import { Router } from "express";
import { getRandomReadingId } from "../controllers/reading";

export const router = Router();

router.get('/', getRandomReadingId);