import * as dotenv from "dotenv";

const result = dotenv.config();

if(result.error){
    console.log(result.error.message);
}

import * as express from "express";
import * as cors from "cors";
import { normalizePort } from "./utils/nomalize-port-env";
import { connect, connection } from "mongoose";
import { router as readingRoute } from "./routes/reading";

const app = express();

const URI = process.env.URI;

connect(URI as string);
connection.on('connected', () => console.log('Connected to MongoDB...'));

app.use(cors());

app.use(express.json());

app.use('/api/v1/reading',readingRoute);

const PORT = normalizePort(8080);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}...`);
});