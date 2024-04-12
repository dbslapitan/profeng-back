import { Router } from "express";
import { getRandomWritingId, getSingleWriting } from "../controllers/writing";

export const router = Router();

router.get('/', getRandomWritingId);

router.get('/:id', getSingleWriting);