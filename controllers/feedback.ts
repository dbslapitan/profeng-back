import { Request, Response } from "express";
import { ReadingFeedback } from "../schemas/reading-feedback";

export async function postReadingFeedback(request: Request, response: Response){
    const readingFeedback = request.body;
    readingFeedback.skill = 'Reading';
    readingFeedback.createdAt = Date.now();
    try{
        const feedback = await ReadingFeedback.create(readingFeedback);
        response.sendStatus(201);
    }
    catch(error){
        response.status(500).json(error);
    }
}