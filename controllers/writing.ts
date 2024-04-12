import { Request, Response } from "express";
import { Writing } from "../schemas/writing";

export async function getRandomWritingId(request: Request, response: Response){
    try{
        const [writing] = await Writing.aggregate().sample(1);
        response.status(200).json(writing._id);
    }
    catch(error){
        response.status(500).json(error);
    }
}

export async function getSingleWriting(request: Request, response: Response) {
    const { id } = request.params;
    try{
        const writing = await Writing.findById(id).select('-__v');
        response.status(201).json(writing);
    }
    catch(error){
        response.status(500).json(error);
    }
}