import express, { Application, NextFunction, Request, Response} from 'express';
import { resolve } from 'path';
import { createServer, Server } from 'http';

import { ClientResourceType } from './client';
import client from './config/client';
import errorHandler from './routes/errors';

import siteRouter from './routes/site';

const app : Application = express();
const server : Server = createServer(app);

app.use('/', siteRouter);

app.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log("Server listening on port: " + process.env.PORT);
});