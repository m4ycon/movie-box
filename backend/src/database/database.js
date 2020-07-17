import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: 'postgresql://postgres:postgres@localhost:5432/movie',
});

export default connection;
