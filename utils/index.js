const Teacher = require("../models/teacher");
const Student = require("../models/student");
const Teacher_Student = require("../models/teacher_student");
const db = require("../config/database");

//Get Teacher data from Teacher table
const getTeacherData = async teacherEmail => {
  let teacher = await Teacher.findOne({
    where: {
      email: teacherEmail
    }
  });
  if (!teacher) {
    teacher = await Teacher.create({
      email: teacherEmail
    });
  }

  return teacher;
};

//Get Student data from Student table
const getStudentData = async studentEmail => {
  let student = await Student.findOne({
    where: {
      email: studentEmail
    }
  });
  if (!student) {
    student = await Student.create({
      email: studentEmail
    });
  }
  return student;
};

//Get Student data from that registered under Teacher
const getRegisteredStudents = async teacherEmail => {
  const studentEmails = [];
  const teacher = await getTeacherData(teacherEmail);

  const students = await teacher.getStudents();
  students.map(student => studentEmails.push(student.email));

  return studentEmails;
};

module.exports = { getTeacherData, getStudentData, getRegisteredStudents };
