import dbTeacher from "../../db_modules/dbTeacher";
import { Teacher, Student } from '../../schema';
import faker from 'faker';
import should from 'should';

let testTeacherEmails = [];
let testStudentEmails = [];

describe("dbTeacher", () => {
  describe("registerStudent", () => {
    let teacher1, students1, students2;
    let teacherEmail1, studentEmail1, studentEmail2, studentEmail3, studentEmail4;
    describe("when the api is call with a new teacher and two new student", () => {
      before(async () => {
        teacherEmail1 = faker.internet.email();
        studentEmail1 = faker.internet.email();
        studentEmail2 = faker.internet.email();
        studentEmail3 = faker.internet.email();
        studentEmail4 = faker.internet.email();
        await dbTeacher.registerStudent(teacherEmail1, [studentEmail1, studentEmail2]);
        teacher1 = await Teacher.findAll({
          attributes: ["id"],
          where: {
            email: teacherEmail1
          },
          raw: true,
        });
        students1 = await Student.findAll({
          attribute: ["id"],
          include: {
            model: Teacher,
            where: {
              email: teacherEmail1
            }
          },
          raw: true
        });
        
      });

      it("should create a new Teacher", () => {
        teacher1.length.should.equal(1);
      });

      it("should register two students under the teacher", () => {
        students1.length.should.equal(2);
      });

      before(async () => {
        await dbTeacher.registerStudent(teacherEmail1, [studentEmail3, studentEmail4]);
        students2 = await Student.findAll({
          attribute: ["id"],
          include: {
            model: Teacher,
            where: {
              email: teacherEmail1
            }
          },
          raw: true
        });
      });

      it("should add two more students if we call this function again with 2 different student email", ()=> {
        students2.length.should.equal(4)
      });

      after(() => {
        testTeacherEmails.push(teacherEmail1);
        testStudentEmails.push(studentEmail1);
        testStudentEmails.push(studentEmail2);
        testStudentEmails.push(studentEmail3);
        testStudentEmails.push(studentEmail4);
      })
    });
    
  })
  after( async () => {
    for (let i = 0; i < testTeacherEmails.length; i++) {
      let teacher = await Teacher.findOne({
        where: {
          email: testTeacherEmails[i]
        }
      });

      if (teacher) {
        teacher.destroy().catch(/* do nothing */);
      }
    }
    for (let i = 0; i < testStudentEmails.length; i++) {
      let student = await Student.findOne({
        where: {
          email: testStudentEmails[i]
        }
      });

      if (student) {
        student.destroy().catch(/* do nothing */);
      }
    }
  })
});

