function dbStudentFunc() {};
export default new dbStudentFunc;

import { Op } from 'sequelize';
import { Student, Teacher } from "../schema";
import { getAliasEmailsFromString } from "../modules/getAliasEmailsFromString";


async function getCommonStudentByTeacher (teacherEmails) {
  const emailQuery = Array.isArray(teacherEmails) ?  { [Op.in]: teacherEmails } : teacherEmails;
  
  const teachers = await Teacher.findAll({
    attributes: ['id'],
    where: {
      email: emailQuery
    },
    raw: true
  });

  if (Array.isArray(teacherEmails) && teacherEmails.length !== teachers.length) {
    return {
      students: []
    };
  }

  const teacherIds = [];
  for (let i = 0; i < teachers.length; i++) {
    if (teachers[i] && teachers[i].id) {
      teacherIds.push(teachers[i].id);
    }
  }

  let relevantStudentIds;
  let commonStudentEmails = [];

  for (let i = 0; i < teacherIds.length; i++) {
    let isLast = i === (teacherIds.length - 1);
    let attributes = isLast ? ["email"] : ["id"];

    let findAllQuery = {
      attributes,
      include: [{
        model: Teacher,
        where: {
          id: teacherIds[i]
        }
      }],
      raw: true
    };

    if (relevantStudentIds && relevantStudentIds.length) {
      findAllQuery.where = {
        id: {
          [Op.in]: relevantStudentIds
        }
      };
    }

    let students = await Student.findAll(findAllQuery);

    if (!students || students.length === 0) {
      commonStudentEmails = [];
      break;
    } else if (isLast) {
      commonStudentEmails = students.map(student => student.email);
    } else {
      relevantStudentIds = students.map(student => student.id);
    }
  }

  return { students: commonStudentEmails };
}

async function suspendStudent (studentEmail) {
  const updated = await Student.update({
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

async function retrieveNotification(teacherEmail, notification) {
  let notificationEmails = getAliasEmailsFromString(notification);

  const studentUnderTeacherProm = Student.findAll({
    attributes: ["email"],
    where: {
      suspended: false
    },
    include: [{
      model: Teacher,
      where: {
        email: teacherEmail
      }
    }],
    raw: true
  }).catch(err => {
    return [];
  });

  const suspendedNotificationStudentProm = Student.findAll({
    attributes: ["email"],
    where: {
      email: {
        [Op.in]: notificationEmails,
      },
      suspended: true
    },
    raw: true
  }).catch(err => {
    return [];
  });

  const [studentUnderTeacher, suspendedNotificationStudent] = await Promise.all([studentUnderTeacherProm, suspendedNotificationStudentProm]);

  const studentUnderTeacherEmails = studentUnderTeacher.map( student => student.email );

  for (let i = 0; i < suspendedNotificationStudent.length; i++) {
    const indexToDelete = notificationEmails.indexOf(suspendedNotificationStudent[i].email);
    notificationEmails.splice(indexToDelete, 1);
  }

  const recipients = [...new Set([].concat(studentUnderTeacherEmails, notificationEmails))];

  return { recipients };
}

dbStudentFunc.prototype = Object.assign(dbStudentFunc.prototype, {
  getCommonStudentByTeacher,
  suspendStudent,
  retrieveNotification,
});