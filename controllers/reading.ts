import { Request, Response } from "express";
import { IReading, Reading } from "../schemas/reading";

export async function getRandomReadingId (request: Request, response: Response) {
    try{
        const [reading] = await Reading.aggregate<IReading>().sample(1);
        response.status(200).json(reading._id);
    }
    catch(error){
        response.status(500).json(error);
    }
}

export async function getSingleReading (request: Request, response: Response){
}