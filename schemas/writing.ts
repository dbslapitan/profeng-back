import { Schema, model } from "mongoose";

export interface IWriting{
    prompt: string
}

const writingSchema = new Schema<IWriting>({
    prompt: { type: String, required: true }
});

export const Writing = model('Writing', writingSchema);