import { Request, Response } from "express";
import { ReadingFeedback } from "../schemas/reading-feedback";
import { WritingFeedback } from "../schemas/writing-feedback";
import { getAiFeedback } from "../utils/openai";

export async function postReadingFeedback(request: Request, response: Response){
    const readingFeedback = request.body;
    readingFeedback.skill = 'Reading';
    readingFeedback.createdAt = Date.now();
    readingFeedback.status = 'evaluated'
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

export async function postWritingFeedback(request: Request, response: Response) {
    
    try{
        const writingFeedback = request.body;
        writingFeedback.createdAt = Date.now();
        writingFeedback.skill = 'Writing';
        writingFeedback.status = 'pending';
        const pendingFeedback = await WritingFeedback.create(writingFeedback);
    
        const instruction = "Instruction: Evaluate the essay based on IELTS writing. Please explain in detail and give examples where in the essay needs improvement without mentioning IELTS. Also, at the end, provide an improved version of the essay. Response should be in JSON format that has been put into JSON.stringify(), each point of feedback should be put in an array of strings called feedback and each paragraph of the improved version should be put in an array named improvedVersion.";
    
        const prompt = `Prompt: ${writingFeedback.prompt}`;
    
        const essay = `${instruction} ${prompt} Answer: ${writingFeedback.essay}`;
    
        const aiFeedback = await getAiFeedback(essay);

        const feedback = JSON.parse(aiFeedback as string);
    
        await WritingFeedback.findByIdAndUpdate(pendingFeedback._id ,{ status: 'evaluated', ...feedback })
    
        response.sendStatus(201);
    }
    catch(error){
        console.log(error);
        response.status(500).json(error);
    }
}