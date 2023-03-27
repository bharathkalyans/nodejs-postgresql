const express = require("express");
const router = express.Router();

const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "",
  port: 5432,
  database: "bharathkalyans",
});

router.get("/", (req, res) => {
  var { limit } = req.query;
  if (!limit) limit = 10;
  pool.query(`SELECT * FROM person LIMIT ${limit}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      console.log(result);
      res.json(result.rows);
    }
  });
});

module.exports = router;
