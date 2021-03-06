import Express from 'express';
import { isEmail, isEmailArray } from '../modules/customValidators';
import { handleOutput } from '../modules/apiOutputHandler';
import { sanitizeEmails, sanitizeString } from '../modules/sanitizers';
import dbTeacher from '../db_modules/dbTeacher';
import dbStudent from '../db_modules/dbStudent';
const rootRouter = Express.Router();

rootRouter.post('/register', (req, res) => {
  const teacherEmail = req.body.teacher;
  const studentEmailArray = req.body.students;
  
  const validations = isEmail(teacherEmail) && isEmailArray(studentEmailArray);

  handleOutput(res, dbTeacher.registerStudent, [teacherEmail, studentEmailArray], 204, validations, [sanitizeEmails, sanitizeEmails]);
});

rootRouter.get('/commonstudents', (req, res) => {
  const teacherEmail = req.query.teacher;

  const validations = isEmail(teacherEmail) || isEmailArray(teacherEmail);

  handleOutput(res, dbStudent.getCommonStudentByTeacher, [teacherEmail], 200, validations, [sanitizeEmails]);
});

rootRouter.post('/suspend', (req, res) => {
  const studentEmail = req.body.student;

  const validations = isEmail(studentEmail);

  handleOutput(res, dbStudent.suspendStudent, [studentEmail], 204, validations, [sanitizeEmails]);
});

rootRouter.post('/retrievefornotifications', (req, res) => {
  const teacherEmail = req.body.teacher;
  const notification = req.body.notification || "";

  const validations = isEmail(teacherEmail) && typeof notification === 'string';

  handleOutput(res, dbStudent.retrieveNotification, [teacherEmail, notification], 200, validations, [sanitizeEmails, sanitizeString]);
});

export {rootRouter};