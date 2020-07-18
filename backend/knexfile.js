const path = require('path');

const dotenv = require('dotenv');
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
  ...(process.env.NODE_ENV === 'test'
    ? {
        client: 'sqlite3',
        connection: {
          filename: path.resolve(__dirname, process.env.SQLITE_FILENAME),
        },
      }
    : {
        client: 'pg',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        },
      }),

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
