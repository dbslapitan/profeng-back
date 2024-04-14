import { connect, connection, disconnect } from "mongoose";
import * as dotenv from "dotenv";
import { readings, writings } from "./data-db";
import { IReading, Reading } from "../schemas/reading";
import { IWriting, Writing } from "../schemas/writing";
    
dotenv.config();
const URI = process.env.URI;

(async () => {
    connection.on('connected', () => console.log('Connected to MongoDB...'));
    connection.on('close', () => console.log('Connection closed...'));

    await connect(URI as string, {bufferCommands: false});

    connection.dropCollection('readings');
    connection.dropCollection('writings');

    const promiseReading: Promise<IReading>[] = [];
    const promiseWriting: Promise<IWriting>[] = [];

    console.log('Populating Reading...');
    
    readings.forEach(async (reading) => {
        console.log(`Adding: ${reading.title}`);
        promiseReading.push(Reading.create(reading));
    });

    await Promise.allSettled(promiseReading);

    console.log('Population of Reading Completed...');

    console.log('Populating Writing...');

    writings.forEach(async (writing) => {
        console.log(`Adding: ${writing.prompt}`)
        promiseWriting.push(Writing.create(writing));
    });

    await Promise.allSettled(promiseWriting);

    console.log('Population of Writing Completed...');
    
    disconnect();
})();