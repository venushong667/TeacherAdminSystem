const Teacher = require("../models/teacher");
const Student = require("../models/student");
const Teacher_Student = require("../models/teacher_student");
const {
  getTeacherData,
  getStudentData,
  getRegisteredStudents
} = require("../utils/index");

//Register Students with Specific teacher
exports.registerStudents = async (req, res) => {
  try {
    const teacherEmail = req.body.teacher;
    const studentEmails = req.body.students;

    const teacher = await getTeacherData(teacherEmail);

    studentEmails.map(async studentEmail => {
      let student = await getStudentData(studentEmail);
      await teacher.addStudents(student);
    });

    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Get all Teacher with registered Students
exports.getAll = async (req, res) => {
  try {
    const teacherEmail = req.query.teacher;
    const result = await Teacher.findAll({
      include: Student
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get common Students registered under same Teachers
exports.getCommonStudents = async (req, res) => {
  try {
    const teacherEmails = req.query.teacher;
    const studentEmails = [];

    if (!Array.isArray(teacherEmails)) {
      const studentEmails = await getRegisteredStudents(teacherEmails);

      res.send({ studentEmails });
    } else {
      var promises = teacherEmails.map(async teacherEmail => {
        const students = await getRegisteredStudents(teacherEmail);

        students.map(student => {
          studentEmails.push(student);
        });
      });
    }

    Promise.all(promises).then(() => {
      const commonStudents = studentEmails.filter(
        (item, index) => studentEmails.indexOf(item) !== index
      );
      res.send({ commonStudents });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Suspend a student status for further use
exports.suspendStudent = async (req, res) => {
  const studentEmail = req.body.student;

  const student = await Student.update(
    { isSuspended: true },
    {
      where: { email: studentEmail }
    }
  );

  res.status(204);
};

//Get recepients if teacher sent a message
exports.notificationMessage = async (req, res) => {
  const teacherEmail = req.body.teacher;
  const notification = req.body.notification;
  const recepients = [];

  mentions = notification.match(/@\S+/g);
  const mentionedEmails = mentions.map(mention => mention.substring(1));

  const registeredEmails = await getRegisteredStudents(teacherEmail);

  const allEmails = [...new Set([...mentionedEmails, ...registeredEmails])];

  var promises = allEmails.map(async email => {
    const emails = await Student.findOne({
      where: { email: email, isSuspended: false }
    });
    if (emails) {
      recepients.push(emails.email);
    }
  });

  Promise.all(promises).then(() => res.send({ recepients }));
};
