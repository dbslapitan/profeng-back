import { Schema, SchemaTypes, model } from "mongoose";
import { IWriting, Writing } from "./writing";

export interface IWritingFeedback{
    writing: string | IWriting,
    essay: string[],
    createdAt: number,
    skill: string,
    status: string,
    feedback: string[],
    improvedVersion: string[]
}

const feedbackSchema = new Schema<IWritingFeedback>({
    writing: { type: SchemaTypes.ObjectId, ref: Writing, required: true },
    essay: [{ type: String, required: true }],
    createdAt: { type: Number, required: true },
    skill: { type: String, required: true },
    status: { type: String, required: true },
    feedback: [{type: String, required: true}],
    improvedVersion: [{type: String, required: true}]
});

export const WritingFeedback = model('WritingFeedback', feedbackSchema);