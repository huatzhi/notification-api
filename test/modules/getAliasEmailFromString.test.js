import { getAliasEmailsFromString } from '../../modules/getAliasEmailsFromString';
import should from 'should';

describe("getAliasEmailsFromString", () => {
  it("should get all valid aliased email", () => {
    getAliasEmailsFromString("@huatzhi@gmail.com").should.deepEqual(["huatzhi@gmail.com"]);
    getAliasEmailsFromString("lets have @huatzhi@gmail.com to the party").should.deepEqual(["huatzhi@gmail.com"]);
    getAliasEmailsFromString("lets have @huatzhi@gmail.com and @TEST@huatzhi.com to the party, sadBob@gmail.com is not").should.deepEqual(["huatzhi@gmail.com", "test@huatzhi.com"]);
  });

  it("should return empty array if nothing matched", () => {
    getAliasEmailsFromString("huatzhi@gmail.com").should.deepEqual([]);
    getAliasEmailsFromString("").should.deepEqual([]);
    getAliasEmailsFromString("Random fox jump over a fence.").should.deepEqual([]);
    getAliasEmailsFromString("Let's see... @ huatzhi@gmail.com... woops, extra space added before the email").should.deepEqual([]);
  })
});