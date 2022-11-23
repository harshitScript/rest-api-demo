const { expect } = require("chai");
const sinon = require("sinon");
const User = require("../models/users");
const {
  testController1,
  testController2,
} = require("../controllers/test.controllers");

describe("test.controllers.js testing suite.", () => {
  describe("testController1 => Synchronous", () => {
    it("should throw and error if test_id is not found in params.", () => {
      const req = {
        params: {
          test_id: "",
        },
      };
      expect(testController1.bind(null, req, {}, () => {})).to.throw(
        "Test id not found."
      );
    });

    it("should return the response if test_id found.", () => {
      const req = {
        params: {
          test_id: "xyz",
        },
      };

      const res = {
        json() {},
      };

      testController1(req, res, () => {});
    });
  });

  describe("testController2 => Asynchronous", () => {
    it("should throw an error if database refuses connection", (done) => {
      const req = {
        query: {
          id: "xyz",
        },
      };
      sinon.stub(User, "findOne");
      User.findOne.throws();
      testController2(req, {}, () => {}).then((res) => {
        User.findOne.restore();
        expect(res).to.be.an("error");
        done();
      });
    });
    it("should throw an error if user not found", (done) => {
      const req = {
        query: {
          id: "xyz",
        },
      };
      sinon.stub(User, "findOne");
      User.findOne.returns(null);
      testController2(req, {}, () => {}).then((res) => {
        User.findOne.restore();
        expect(res).to.be.an("error");
        done();
      });
    });
  });
});
