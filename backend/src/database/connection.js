import knex from 'knex';
import path from 'path';

import { config } from 'dotenv';
config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const connection = knex(require('../../knexfile'));

export default connection;
