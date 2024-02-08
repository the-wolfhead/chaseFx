const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:root@localhost:5431/hfx');

// Replace 'username', 'password', and 'yourdatabase' with your actual credentials
const { Pool } = require('pg');

const connection = new Pool({
  user: 'myapp_qskd_user',
  host: 'dpg-cn0g0i0l5elc73ejge5g-a.oregon-postgres.render.com',
  database: 'myapp_qskd',
  password: 'i06MCdq5BS3j1CneWNsRRJt5rFGIqtaS',
  port: 5432, // default PostgreSQL port
  multipleStatements: true,
});

connection.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

module.exports = connection;

