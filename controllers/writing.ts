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