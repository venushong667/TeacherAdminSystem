const Sequelize = require("sequelize");
const db = require("../config/database");

//Get defined models/tables from database
const Teacher = db.sequelize.models.teachers;
const Student = db.sequelize.models.students;

//This is a join table for N:M Relationship
const Teacher_Students = db.sequelize.define(
  "teacher_students",
  {},
  { timestamps: false }
);

//Relationship between Student and Teacher
Student.belongsToMany(Teacher, {
  through: Teacher_Students
});
Teacher.belongsToMany(Student, {
  through: Teacher_Students
});

module.exports = Teacher_Students;
