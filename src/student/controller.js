const pool = require("./db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};
const getStudentsById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  pool.query(queries.checkEmailExists, [email], (err, results) => {
    console.log(results);
    if (results.rows.length) {
      res.send("Email already exists");
    }
    //
    pool.query(queries.addStudent, [name, email, age, dob], (err, results) => {
      if (err) throw err;
      res.status(201).send("Student Created Successfully!");
    });
  });
};

module.exports = {
  getStudents,
  getStudentsById,
  addStudent,
};
