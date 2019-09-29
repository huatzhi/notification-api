import { isEmail, isEmailArray } from '../../modules/customValidators';
import should from 'should';

describe("custom validator", () => {
  describe("isEmail", () => {
    it("should return true when email format is correct", () => {
      isEmail("huatzhi@gmail.com").should.equal(true);
      isEmail("www.ns_1993@hotmail.com").should.equal(true);
      isEmail("test@huatzhi.com").should.equal(true);
    });

    it("should return false when it is not email", () => {
      isEmail("www.ns_1993hotmail.com").should.equal(false);
      isEmail("www.google.com").should.equal(false);
      isEmail("#%$^@%$^%.cc").should.equal(false);
      isEmail("??@??.??").should.equal(false);
      isEmail("emailalike@butnodot").should.equal(false);
      isEmail(["correct@email.com"]).should.equal(false);
      isEmail({}).should.equal(false);
      isEmail([]).should.equal(false);
      isEmail({email: "huatzhi@gmail.com"}).should.equal(false);
      isEmail(NaN).should.equal(false);
      isEmail(Infinity).should.equal(false);
      isEmail(0).should.equal(false);
      isEmail(null).should.equal(false);
      isEmail(undefined).should.equal(false);
      isEmail(()=>{}).should.equal(false);
      isEmail(Date).should.equal(false);
      isEmail(true).should.equal(false);
    });
  });

  describe("isEmailArray", () => {
    it("should return false when it is not an array", () => {
      isEmailArray("test@huatzhi.com").should.equal(false);
      isEmailArray({}).should.equal(false);
      isEmailArray(() => {}).should.equal(false);
      isEmailArray(undefined).should.equal(false);
      isEmailArray(NaN).should.equal(false);
      isEmailArray(Infinity).should.equal(false);
      isEmailArray(0).should.equal(false);
      isEmailArray(null).should.equal(false);
    });

    it("should return true when receive an array contain nothing", () => {
      isEmailArray([]).should.equal(true);
    });

    it("should return false when array content include any non-email", () => {
      isEmailArray(["correct@email.com", ""]).should.equal(false);
      isEmailArray(["", "correct@email.com"]).should.equal(false);
    });

    it("should return true when all array content are correct email", () => {
      isEmailArray(["huatzhi@gmail.com", "www.ns_1993@hotmail.com", "test@huatzhi.com"]).should.equal(true);
      isEmailArray(["correct@email.com"]).should.equal(true);
    });
  });
});