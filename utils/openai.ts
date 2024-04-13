import * as dotenv from "dotenv";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

dotenv.config();

const OPENAI_KEY = process.env.OPENAI_SECRET_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_KEY
});

export async function getAiFeedback(prompt: string){
    const chatHistory = [];
    chatHistory.push({role: 'user', content: prompt});
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: chatHistory as ChatCompletionMessageParam[]
    });
    return response.choices[0].message.content;
}