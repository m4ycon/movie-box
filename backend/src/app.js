import express from 'express';
import cors from 'cors';
import routes from './routes';

import { config } from 'dotenv';
config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

class AppController {
  constructor() {
    this._express = express();

    this.middleware();
    this.routes();
  }

  middleware() {
    this._express.use(express.json());
    this._express.use(cors());
  }

  routes() {
    this._express.use(routes);
  }
}

export default new AppController()._express;
