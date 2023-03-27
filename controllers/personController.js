const getPerson = (req, res) => {
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
};

const getPersonById = (req, res) => {
  const { personId } = req.params;

  pool.query(`SELECT * FROM person where id=${personId}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Person Not Available! by the Id ${personId}`);
    } else {
      res.json(result.rows);
    }
  });
};

const createPerson = (req, res) => {
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
        res.status(500).send("Unable to Create person!!!");
      } else {
        res.json(result.rows);
      }
    }
  );
};

const updatePerson = (req, res) => {
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
        res.status(500).send("Unable to Update Person!!!");
      } else {
        res.status(200).send(`Person Modified with id : ${id}`);
      }
    }
  );
};

const deletePersonById = (req, res) => {
  const { personId } = req.params;

  pool.query(`DELETE FROM person where id=${personId}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Unable to Delete Person");
    } else {
      console.log(result);
      res.json(result.rows);
    }
  });
};

module.exports = {
  getPerson,
  getPersonById,
  updatePerson,
  createPerson,
  deletePersonById,
};
