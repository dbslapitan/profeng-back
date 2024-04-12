import { Router } from "express";
import { getRandomReading } from "../controllers/reading";

export const router = Router();

router.get('/', getRandomReading);