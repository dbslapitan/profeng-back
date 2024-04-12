import { Schema, model } from "mongoose";

export interface IWriting{
    prompt: string
}

const writingSchema = new Schema<IWriting>({
    prompt: String
});

export const Writing = model('Writing', writingSchema);