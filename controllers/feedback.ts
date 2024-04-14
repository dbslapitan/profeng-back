import { Request, Response } from "express";
import { ReadingFeedback } from "../schemas/reading-feedback";
import { WritingFeedback } from "../schemas/writing-feedback";
import { getAiFeedback } from "../utils/openai";
import { IWriting } from "../schemas/writing";

export async function postReadingFeedback(request: Request, response: Response) {
    const readingFeedback = request.body;
    readingFeedback.skill = 'Reading';
    readingFeedback.createdAt = Date.now();
    readingFeedback.status = 'evaluated'
    try {
        const reading = await ReadingFeedback.create(readingFeedback);
        response.status(201).json(reading._id);
    }
    catch (error) {
        response.status(500).json(error);
    }
}

export async function getAllFeedback(request: Request, response: Response) {
    try {
        const readingFeedbacks = await ReadingFeedback.find().populate('reading').select('reading createdAt skill status');
        const writingFeedbacks = await WritingFeedback.find().populate('writing').select('-writing createdAt skill status');
        const feedbacks = [...readingFeedbacks, ...writingFeedbacks];
        feedbacks.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        response.status(200).json(feedbacks);
    }
    catch (error) {
        response.status(500).json(error);
    }
}

export async function postWritingFeedback(request: Request, response: Response) {

    try {
        const writingFeedback = request.body;
        writingFeedback.createdAt = Date.now();
        writingFeedback.skill = 'Writing';
        writingFeedback.status = 'pending';
        const pendingFeedback = await WritingFeedback.create(writingFeedback);

        response.status(201).json(pendingFeedback._id);
    }
    catch (error) {
        response.status(500).json(error);
    }
}

export async function getSingleWritingFeedback(request: Request, response: Response) {
    const { id } = request.params;
    try {
        const writingFeedback = await WritingFeedback.findById(id).populate('writing').select('-__v');

        if (writingFeedback?.status === 'pending') {
            const instruction = "Instruction: Evaluate the essay based on IELTS writing. Please explain in detail and give examples where in the essay needs improvement without mentioning IELTS. Also, at the end, provide an improved version of the essay. Response should be in JSON format that has been put into JSON.stringify(), each point of feedback should be put in an array of strings called feedback and each paragraph of the improved version should be put in an array named improvedVersion.";

            const prompt = `Prompt: ${(writingFeedback.writing as IWriting).prompt}`;

            const essay = `${instruction} ${prompt} Answer: ${writingFeedback.essay}`;

            const aiFeedback = await getAiFeedback(essay);

            const feedback = JSON.parse(aiFeedback as string);

            const evaluated = await WritingFeedback.findByIdAndUpdate(writingFeedback._id, { status: 'evaluated', ...feedback }).populate('writing').select('-__v');

            return response.status(200).json(evaluated);
        }else{

            response.status(200).json(writingFeedback);
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}

export async function getSingleReadingFeedback(request: Request, response: Response) {
    const { id } = request.params;
    try {
        const readingFeedback = await ReadingFeedback.findById(id).populate('reading').select('-__v');
        response.status(200).json(readingFeedback);
    }
    catch (error) {
        response.status(500).json(error);
    }
}