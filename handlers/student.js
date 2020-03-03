const Student = require("../models/student");
const db = require("../config/database");

exports.getStudents = async (req, res) => {
  Student.findAll()
    .then(user => res.send(user))
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

exports.getStudent = async (req, res) => {
  try {
    const studentEmail = req.query.student;
    const student = await Student.findOne({
      where: {
        email: studentEmail
      }
    });
    res.send(student);
    return student;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const student = await Student.create({ email: req.body.student });
    res.send(student);
    return student;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
