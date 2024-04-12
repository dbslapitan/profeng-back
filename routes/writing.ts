import { Router } from "express";
import { getRandomWritingId } from "../controllers/writing";

export const router = Router();

router.get('/', getRandomWritingId);