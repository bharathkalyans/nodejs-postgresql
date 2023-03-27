const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "",
  port: 5432,
  database: "bharathkalyans",
});

module.exports = { pool };
