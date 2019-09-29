import { emailRegex } from "../../modules/regex";
import should from 'should';

describe("emailRegex", () => {
  it("should match email if its on the start of the string", () => {
    should.exist("huatzhi@gmail.com@whatvere at the back".match(emailRegex));
  });

  it("should not match anything if the string is empty", () => {
    should.not.exist("".match(emailRegex));
  });

  it("should not match anything if the email is not at the start", () => {
    should.not.exist("@this@should.not work".match(emailRegex));
  });
});