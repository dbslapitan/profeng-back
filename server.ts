import * as dotenv from 'dotenv';

const result = dotenv.config();

if(result.error){
    console.log(result.error.message);
}

import * as express from 'express';
import * as cors from 'cors';
import { normalizePort } from './utils/nomalize-port-env';

const app = express();

app.use(cors());

app.use(express.json());

const PORT = normalizePort(8080);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}...`);
});