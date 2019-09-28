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


dbStudentFunc.prototype = Object.assign(dbStudentFunc.prototype, {
  getStudentByTeacher,
});