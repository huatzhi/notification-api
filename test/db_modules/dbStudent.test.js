import dbStudent from "../../db_modules/dbStudent";
import { Teacher, Student } from '../../schema';
import faker from 'faker';
import should from 'should';

let teachers = [];
let students = [];

describe("dbStudent", () => {
  before(async () => {
    teachers[0] = await Teacher.create({ email: faker.internet.email().toLowerCase() });
    students[0] = await Student.create({ email: faker.internet.email().toLowerCase() });
    students[1] = await Student.create({ email: faker.internet.email().toLowerCase() });
    students[2] = await Student.create({ email: faker.internet.email().toLowerCase() });
    students[3] = await Student.create({ email: faker.internet.email().toLowerCase() });
    teachers[0].addStudents([students[0], students[1], students[2]]);
    teachers[1] = await Teacher.create({ email: faker.internet.email().toLowerCase() });
    students[4] = await Student.create({ email: faker.internet.email().toLowerCase() });
    students[5] = await Student.create({ email: faker.internet.email().toLowerCase() });
    students[6] = await Student.create({ email: faker.internet.email().toLowerCase(), suspended: true });
    students[7] = await Student.create({ email: faker.internet.email().toLowerCase(), suspended: true });
    teachers[1].addStudents([students[2], students[4], students[5], students[6]]);
    teachers[2] = await Teacher.create({ email: faker.internet.email().toLowerCase() });
  });
  describe("getCommonStudentByTeacher", () => {
    it("should get students when provided a teacher", async () => {
      let result = await dbStudent.getCommonStudentByTeacher(teachers[0].email);
      result.students.should.containDeep([students[0].email, students[1].email, students[2].email]);
      result.students.length.should.equal(3);
    });

    it("should contain only student shared by both teacher", async () => {
      let result = await dbStudent.getCommonStudentByTeacher([teachers[0].email, teachers[1].email]);
      result.students.should.containDeep([
        students[2].email,
      ]);
      result.students.length.should.equal(1);
    });

    it("should get no students when teacher do not have them", async () => {
      let result = await dbStudent.getCommonStudentByTeacher([teachers[2].email, faker.internet.email().toLowerCase()]);
      result.students.length.should.equal(0);
    });
  });

  describe("suspendStudent", () => {
    it("should suspend given student", async () => {
      await dbStudent.suspendStudent(students[1].email);
      await students[1].reload();
      students[1].suspended.should.equal(true);
    });

    it("should be rejected when given non Student email", async () => {
      let tempEmail = faker.internet.email().toLowerCase();
      await dbStudent.suspendStudent(tempEmail).should.be.rejected();
    });
  });

  describe("retrieveNotification", () => {
    let result;
    before(async () => {
      result = await dbStudent.retrieveNotification(teachers[1].email, `Lorem ipsum @test@huatzhi.com and @${students[5].email}!!! @${students[7].email}#$%^&@gg@nore.cc`);
    });

    it("should result include email of all student under the teacher", () => {
      result.recipients.should.containDeep([
        students[2].email,
        students[4].email,
        students[5].email,
      ]);
    });

    it("should result include alias email", () => {
      result.recipients.should.containDeep([
        students[5].email,
        "test@huatzhi.com",
        "gg@nore.cc"
      ]);
    });

    it("should not contain student email that suspended", () => {
      result.recipients.should.not.matchAny(students[6].email);
      result.recipients.should.not.matchAny(students[7].email);
    });

    it("should not contain duplicate recipient", () => {
      result.recipients.length.should.equal(5);
    });

    it("should contain nothing if nothing is matched", async () => {
      let emptyResult = await dbStudent.retrieveNotification(teachers[2].email, "nothing here, with @not email.");
      emptyResult.recipients.length.should.equal(0);
    });
  });
  after(async() => {
    for (let i = 0; i < teachers.length; i++) {
      teachers[i].destroy().catch(/* do nothing */);
    }
    for (let i = 0; i < students.length; i++) {
      students[i].destroy().catch(/* do nothing */);
    }
  })
});