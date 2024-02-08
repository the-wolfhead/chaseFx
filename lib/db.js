const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:root@localhost:5431/hfx');

// Replace 'username', 'password', and 'yourdatabase' with your actual credentials
const { Pool } = require('pg');

const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hfx',
  password: 'root',
  port: 5431, // default PostgreSQL port
  multipleStatements: true,
});

connection.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

module.exports = connection;

