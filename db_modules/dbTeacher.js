function dbTeacherFunc () {};
export default new dbTeacherFunc;

import { Student, Teacher } from "../schema";

async function registerStudent(teacherEmail, studentEmails) {
  let teacherProm = Teacher.findOrCreate({where: {email: teacherEmail}});
  let studentsProm = [];
  if (!studentEmails || !studentEmails.length) {
    return Promise.reject(new Error("Student emails are required to register student."));
  }

  for (let i = 0; i < studentEmails.length; i++) {
    let studentEmail = studentEmails[i];
    let prom = Student.findOrCreate({
      attributes: ['id'],
      where: {
        email: studentEmail
      }, 
      raw: true
    });
    studentsProm.push(prom);
  }

  studentsProm = Promise.all(studentsProm);
  let [[teacher], students] = await Promise.all([teacherProm, studentsProm]);
  
  let studentIds = students.map(student => student[0].id);
  await teacher.addStudent(studentIds);
}

dbTeacherFunc.prototype = Object.assign(dbTeacherFunc.prototype, {
  registerStudent,
});