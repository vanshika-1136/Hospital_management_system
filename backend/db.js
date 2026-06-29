// import pkg from 'pg';

// server/db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

// import pkg from 'pg';
// const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // host: process.env.PG_HOST,
  // port: process.env.PG_PORT,
  // user: process.env.PG_USER,
  // password: process.env.PG_PASSWORD,
  // database: process.env.PG_DATABASE,
});

export default pool;

console.log("Connected DB:", process.env.PG_DATABASE);
pool.query('SELECT current_database()', (err, res) => {
  if (err) console.log(err);
  else console.log("Actual DB:", res.rows[0].current_database);
});

