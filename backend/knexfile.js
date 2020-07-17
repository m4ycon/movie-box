const path = require('path');

module.exports = {
  client: 'pg',
  connection: {
    user: 'postgres',
    password: 'postgres',
    database: 'movie'
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  pool: {
    min: 1,
    max: 50,
    propagateCreateError: false,
  },
  useNullAsDefault: true,
};
