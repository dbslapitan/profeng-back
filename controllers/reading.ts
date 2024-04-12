import { Request, Response } from "express";
import { IReading, Reading } from "../schemas/reading";
import { readings } from "../db/data-db";

export async function getRandomReading (request: Request, response: Response) {
    await Reading.create(readings[0]);
    const reading = await Reading.find<IReading>();
    console.log(reading);
    response.json(reading);
}