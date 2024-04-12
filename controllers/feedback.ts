import { Request, Response } from "express";
import { ReadingFeedback } from "../schemas/reading-feedback";

export async function postReadingFeedback(request: Request, response: Response){
    const readingFeedback = request.body;
    readingFeedback.skill = 'Reading';
    readingFeedback.createdAt = Date.now();
    try{
        await ReadingFeedback.create(readingFeedback);
        response.sendStatus(201);
    }
    catch(error){
        response.status(500).json(error);
    }
}

export async function getAllFeedback(request: Request, response: Response) {
    try{
        const readingFeedbacks = await ReadingFeedback.find().populate('reading').select('-__v');
        const feedbacks = [...readingFeedbacks];
        response.status(200).json(feedbacks);
    }
    catch(error){
        response.status(500).json(error);
    }
}