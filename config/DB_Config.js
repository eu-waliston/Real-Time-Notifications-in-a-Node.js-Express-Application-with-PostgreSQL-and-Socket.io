require("dotenv").config();

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
  });

  //connection test
  const client = await pool.connect();
  console.log("Connection sucess...");

  const res = await client.query("SELECT NOW()");
  console.log(res.rows[0]);
  client.release();

  //keep to use always the same
  global.connection = pool;
  return pool.connect();
}

connect();