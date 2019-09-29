import { handleOutput } from "../../modules/apiOutputHandler";
import should from 'should';

class ResMock {
  constructor() {
    this.code = "";
    this.json = "";
    return {status: this.status};
  };

  status(code) {
    this.code = code;
    let resmock = this;
    return {
      json(data) {
        resmock.json = data;
      }
    }
  }
}

let mockSuccessFunction = {
  input: "",
  secondInput: "",
  thirdInput: "",
  successFunction: (input, secondInput, thirdInput) => {
    mockSuccessFunction.input = input;
    mockSuccessFunction.secondInput = secondInput;
    mockSuccessFunction.thirdInput = thirdInput;
    return Promise.resolve(input);
  }
}

let mockFailedFunction = function () {
  let err = new Error("error message");
  err.code = 407;
  return Promise.reject(err);
}

let mockSanitizer = (input) => {
  return input += 2;
}

let mockSanitizerTwo = (input) => {
  return input += 5;
}

describe("api output handler", () => {
  describe("when validation is false", () => {
    let res = new ResMock;
    before(async () => {
      await handleOutput(res, mockSuccessFunction.successFunction, ["exampleString"], 204, false, []);
    });

    it("should output status code 400", () => {
      res.code.should.equal(400);
    });

    it("should output error message", () => {
      should.exist(res.json);
    });

    it("should not reach db function", () => {
      should.notEqual(mockSuccessFunction.input, "exampleString");
    });
  });

  describe("when there is no error", () => {
    let res = new ResMock;
    before(async () => {
      await handleOutput(res, mockSuccessFunction.successFunction, [5, 9, 13], 204, true, [mockSanitizer, mockSanitizerTwo]);
    });

    it("should output inserted success status code", () => {
      res.code.should.equal(204);
    });

    it("should call function with sanitized value with correct sanitizer", () => {
      mockSuccessFunction.input.should.equal(7);
      mockSuccessFunction.secondInput.should.equal(14);
    });

    it("should call function with correct arguments even without sanitizer", () => {
      mockSuccessFunction.thirdInput.should.equal(13);
    });

    it("should output correct value to res", () => {
      res.json.should.equal(7);
    });
  });

  describe("when there is error", () => {
    let res = new ResMock;
    // let failedFunction = new mockFailedFunction;
    before(async () => {
      await handleOutput(res, mockFailedFunction, [405], 204, true, [mockSanitizer]);
    });

    it("should output error code provided", () => {
      res.code.should.equal(407);
    });

    it("should output proper error message given by Error object", () => {
      res.json.message.should.equal("error message");
    });
  });
});