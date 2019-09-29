import { sanitizeEmails, sanitizeString } from "../../modules/sanitizers";
import should from 'should';

describe("sanitizers", () => {
  describe("sanitizeEmails", () => {
    it("should sanitize email if it is string", () => {
      sanitizeEmails(" HuatZhi@gmail.com  ").should.equal("huatzhi@gmail.com");
      sanitizeEmails("test@huatzhi.com").should.equal("test@huatzhi.com");
    });

    it("should sanitize every email in an array", () => {
      sanitizeEmails([]).should.deepEqual([]);
      sanitizeEmails(["  HUATzhi@gmail.com  ", " tEST@HUATZHI.COM   "]).should.deepEqual(["huatzhi@gmail.com", "test@huatzhi.com"]);
    });
  });

  describe("sanitizeString", () => {
    it("should trim string", () => {
      sanitizeString("  test   ").should.equal("test");
    });
  })
})