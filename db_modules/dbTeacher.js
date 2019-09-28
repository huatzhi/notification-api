function dbTeacherFunc () {};
export default new dbTeacherFunc;

import { Student, Teacher } from "../schema";

async function registerStudent(teacherEmail, studentEmails) {
  const teacherProm = Teacher.findOrCreate({where: {email: teacherEmail}});
  let studentsProm = [];
  if (!studentEmails || !studentEmails.length) {
    return Promise.reject(new Error("Student emails are required to register student."));
  }

  for (let i = 0; i < studentEmails.length; i++) {
    const studentEmail = studentEmails[i];
    const prom = Student.findOrCreate({
      attributes: ['id'],
      where: {
        email: studentEmail
      }, 
      raw: true
    });
    studentsProm.push(prom);
  }

  studentsProm = Promise.all(studentsProm);
  const [[teacher], students] = await Promise.all([teacherProm, studentsProm]);
  
  const studentIds = students.map(student => student[0].id);
  await teacher.addStudent(studentIds);
}

dbTeacherFunc.prototype = Object.assign(dbTeacherFunc.prototype, {
  registerStudent,
});