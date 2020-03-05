const Teacher = require("../models/teacher");
const db = require("../config/database");

exports.getTeachers = async (req, res) => {
  Teacher.findAll()
    .then(user => res.send(user))
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

exports.getTeacher = async (req, res) => {
  try {
    const teacherEmail = req.query.teacher;
    const teacher = await Teacher.findOne({
      where: {
        email: teacherEmail
      }
    });
    res.send(teacher);
    return teacher;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create({ email: req.body.teacher });
    res.send(teacher);
    return teacher;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
