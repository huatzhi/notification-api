import Express from 'express';
import { isEmail, isEmailArray } from '../modules/customValidators';
import { handleOutput } from '../modules/apiOutputHandler';
import dbTeacher from '../db_modules/dbTeacher';
const rootRouter = Express.Router();

rootRouter.post('/register', (req, res) => {
  const teacherEmail = req.body.teacher;
  const studentEmailArray = req.body.students;
  
  let validations = isEmail(teacherEmail) && isEmailArray(studentEmailArray);

  handleOutput(res, dbTeacher.registerStudent, [teacherEmail, studentEmailArray], 204, validations);
});

rootRouter.get('/commonstudents', (req, res) => {
  res.json({message: "r2 reached"});
});

rootRouter.post('/suspend', (req, res) => {
  res.json({message: "r3 reached"});
});

rootRouter.post('/retrievefornotifications', (req, res) => {
  res.json({message: "r4 reached"});
});

export {rootRouter};