import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    user: 'postgres',
    password: 'postgres',
    database: 'movie',
  },
});

export default connection;
