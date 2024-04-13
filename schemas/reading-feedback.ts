import { Schema, SchemaTypes, model } from "mongoose"
import { Reading } from "./reading";

interface IReadingFeedback{
    reading: IReadingFeedback | string,
    skill: string,
    createdAt: number,
    status: string,
    answers: string[]
}

const feedbackSchema = new Schema<IReadingFeedback>({
    reading: { type: SchemaTypes.ObjectId, required: true, ref: Reading },
    skill: { type: String, required: true },
    createdAt: { type: Number, required: true },
    status: { type: String, required: true },
    answers: [{type: String, required: true}]
});

export const ReadingFeedback = model("ReadingFeedback", feedbackSchema);