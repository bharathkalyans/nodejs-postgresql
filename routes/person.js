const express = require("express");
const router = express.Router();

const pool = require("../db/pgdbconfig").pool;

router.get("/", (req, res) => {
  var { limit } = req.query;
  if (!limit) limit = 10;
  pool.query(`SELECT * FROM person LIMIT ${limit};`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(result.rows);
    }
  });
});

router.get("/:personId", (req, res) => {
  const { personId } = req.params;

  pool.query(`SELECT * FROM person where id=${personId}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Person Not Available!");
    } else {
      res.json(result.rows);
    }
  });
});

router.post("/", (req, res) => {
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    date_of_birth,
    country_of_birth,
  } = req.body;
  const QUERY = `INSERT INTO PERSON (id, 
    first_name,
    last_name,
    email,
    gender,
    date_of_birth,
    country_of_birth) VALUES ($1,$2,$3,$4,$5,$6,$7);`;
  pool.query(
    QUERY,
    [id, first_name, last_name, email, gender, date_of_birth, country_of_birth],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Person Not Available!");
      } else {
        res.json(result.rows);
      }
    }
  );
});

router.put("/:id", (req, res) => {
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    date_of_birth,
    country_of_birth,
  } = req.body;
  const QUERY = `UPDATE PERSON SET 
    first_name=$2,
    last_name=$3,
    email=$4,
    gender=$5,
    date_of_birth=$6,
    country_of_birth=$7 WHERE id=$1;`;
  pool.query(
    QUERY,
    [id, first_name, last_name, email, gender, date_of_birth, country_of_birth],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Person Not Available!");
      } else {
        res.status(200).send(`Person Modified with id : ${id}`);
      }
    }
  );
});

router.delete("/:personId", (req, res) => {
  const { personId } = req.params;

  pool.query(`DELETE FROM person where id=${personId}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Person Not Available!");
    } else {
      console.log(result);
      res.json(result.rows);
    }
  });
});

module.exports = router;
