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

    const promises: Promise<IReading | IWriting>[] = [];

    console.log('Populating Reading...');
    
    readings.forEach(async (reading) => {
        console.log(`Adding: ${reading.title}`);
        promises.push(Reading.create(reading));
    });

    console.log('Population of Reading Completed...');

    console.log('Populating Writing...');

    writings.forEach(async (writing) => {
        console.log(`Adding: ${writing.prompt}`)
        promises.push(Writing.create(writing));
    });

    await Promise.allSettled(promises);
    disconnect();
})();