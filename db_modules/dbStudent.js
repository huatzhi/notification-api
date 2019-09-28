function dbStudentFunc() {};
export default new dbStudentFunc;

import { Op } from 'sequelize';
import { Student, Teacher } from "../schema";
import { isArray } from "util";


async function getStudentByTeacher (teacherEmails) {
  const emailQuery = isArray(teacherEmails) ?  { [Op.in]: teacherEmails } : teacherEmails;
  
  const teachers = await Teacher.findAll({
    attributes: ['id'],
    where: {
      email: emailQuery
    }
  }, {
    raw: true
  });


  const teacherIds = [];
  for (let i = 0; i < teachers.length; i++) {
    if (teachers[i] && teachers[i].id) {
      teacherIds.push(teachers[i].id);
    }
  }
  
  let students = await Student.findAll({
    attributes: ["email"],
    include:[{
      model: Teacher,
      where: {
        id: {
          [Op.in]: teacherIds
        }
      }
    }]
  });

  return {
    students: students.map(student => student.email)
  };
}

async function suspendStudent (studentEmail) {
  let updated = await Student.update({
    suspended: true
  }, {
    where: {
      email: studentEmail
    }
  });
  if (!updated[0]) {
    return Promise.reject(new Error("Update failed. It is likely because either student email does not exist or you have sent more than one same request within a short moment."));
  }
}


dbStudentFunc.prototype = Object.assign(dbStudentFunc.prototype, {
  getStudentByTeacher,
  suspendStudent,
});