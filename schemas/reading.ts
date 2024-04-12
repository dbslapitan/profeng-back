import { Schema, model } from "mongoose";

export interface IReading {
    _id?: string,
    title: string,
    content: [string],
    questions: [IQuestion]
}

interface IQuestion {
    question: string,
    options: [string],
    answer: string
}

const questionSchema = new Schema<IQuestion>({
    question: {type: String, required: true},
    options: [{type: String, required: true}],
    answer: {type: String, required: true}
}, {_id: false});

const readingSchema = new Schema<IReading>({
    title: {type: String, required: true},
    content: [{type: String, required: true}],
    questions: [questionSchema]
});

export const Reading = model<IReading>('Reading', readingSchema);