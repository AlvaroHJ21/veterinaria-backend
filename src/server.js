import express from 'express';
import router from './routes/index.js';
import morgan from 'morgan';
import cors from 'cors';

import { serverConfig } from './config/index.js';
import {
    boomErrorHandler,
    dbErrorHandler,
    errorHandler,
    logErrors,
} from './middlewares/error.handler.js';

export class Server {
    constructor() {
        this.app = express();
        this.port = serverConfig.port;
        this.middlewares();
        this.routes();
        this.errorMiddlewares();
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/v1', router);
    }

    errorMiddlewares() {
        this.app.use(logErrors);
        this.app.use(dbErrorHandler);
        this.app.use(boomErrorHandler);
        this.app.use(errorHandler);
    }

    listen() {
        this.app.listen(this.port, () => {
            // eslint-disable-next-line no-console
            console.log(`Server listening on port ${this.port}`);
        });
    }
}
