const express = require("express");
const router = express.Router();
const {
  registerStudents,
  getCommonStudents,
  getAll,
  suspendStudent,
  notificationMessage
} = require("../handlers/api");
const { getTeachers, getTeacher, addTeacher } = require("../handlers/teacher");
const { getStudents, getStudent, addStudent } = require("../handlers/student");

router.get("/", (req, res) => {
  res.send("Hi");
});

//For Teacher
router.get("/teachers", getTeachers);
router.get("/teacher", getTeacher);
router.post("/teacher", addTeacher);

//For Student
router.get("/students", getStudents);
router.get("/student", getStudent);
router.post("/student", addStudent);

//Main functions
router.post("/register", registerStudents);
router.get("/commonstudents", getCommonStudents);
router.post("/suspend", suspendStudent);
router.get("/all", getAll);
router.post("/notification", notificationMessage);

module.exports = router;
