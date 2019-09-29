import { dbConn } from "../../modules/dbConn";
import should from 'should';

describe("database connection (dbConn)", () => {
  it("should connect to database", async () => {
    await dbConn.authenticate(); // will prompt error if it could not connect
  })
});