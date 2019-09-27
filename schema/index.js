import Teacher from "./Teacher";
import Student from "./Student";
import { dbConn } from "../modules/dbConn";

Teacher.belongsToMany(Student, { through: "TeacherStudent" });
Student.belongsToMany(Teacher, { through: "TeacherStudent" });

dbConn.sync();

export {
  Teacher,
  Student
};