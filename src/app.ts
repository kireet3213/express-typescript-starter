import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join('../.env') });
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connection from './configuration/database/database.config';
import userRoutes from './routes/user/user';
import { globalErrorHandler } from './middleware/error-handler.middleware';

const app: Application = express();

app.use(cors());

// parse requests of content-type - application/json

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Express server with TypeScript');
});

app.use('/user', userRoutes);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8080;

connection
    .authenticate()
    .then(() => {
        console.log('Database successfully connected');
    })
    .catch((err) => {
        console.log('Error', err);
    });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
