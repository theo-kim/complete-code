import express, { Application, NextFunction, Request, Response} from 'express';
import { resolve } from 'path';
import { createServer, Server } from 'http';
// import * as ioserver from 'socket.io';

import { ClientResourceType } from './client';
import client from './config/client';
import errorHandler from './routes/errors/index';

import siteRouter from './routes/site/index';
import apiRouter from './routes/api/index';

// import sockertHandler from './sockets';

const app : Application = express();
const server : Server = createServer(app);
// const io : SocketIO.Server = require("socket.io")(server, {serveClient: false});

app.use('/', siteRouter);
app.use('/console', apiRouter);

app.use(errorHandler);

// io.on('connection', sockertHandler);

server.listen(process.env.PORT, () => {
    console.log("Server listening on port: " + process.env.PORT);
});