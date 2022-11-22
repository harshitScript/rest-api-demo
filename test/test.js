const { expect } = require("chai");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authChecker = require("../middleware/authChecker");
const {
  loginUserController,
  userStatusController,
} = require("../controllers/user.controllers");
const User = require("../models/users");

describe("Server configuration suite.", () => {
  it("Server name must be rest-api-demo ", () => {
    expect(process.env.SERVER_NAME).to.be.equal("rest-api-demo");
  });

  it("Server running of correct port corresponding to app phase.", () => {
    if (process.env.APP_PHASE === "DEV") {
      expect(process.env.PORT).to.be.equal("4000");
    }
    if (process.env.APP_PHASE === "UAT") {
      expect(process.env.PORT).to.be.equal("5000");
    }
    if (process.env.APP_PHASE === "PROD") {
      expect(process.env.PORT).to.be.equal("8080");
    }
  });
});

describe("Middleware testing suite", () => {
  describe("authChecker.js", () => {
    it("should throw error when don't have authorization header in request", () => {
      const req = {
        headers: {
          authorization: null,
        },
      };

      expect(authChecker.bind(null, req, {}, () => {})).to.throw(
        "Authorization header not found."
      );
    });

    it("should throw an error if malformed jwt is passed", () => {
      const req = {
        headers: {
          authorization: "Bearer xyz",
        },
      };

      expect(
        authChecker.bind(null, req, {}, () => {
          throw new Error("Malformed JWT");
        })
      ).to.throw("Malformed JWT");
    });

    it("should store the userId to the request object, in case of correct jwt.", () => {
      const req = {
        headers: {
          authorization:
            "Bearer khashkjcgfhjdsfjsfghasjhdfkjsadhksadjlksajdklajdla",
        },
      };

      sinon.stub(jwt, "verify"); //* A substitute method is created

      jwt.verify.returns({ userId: "yo yo" });

      authChecker(req, {}, () => {});

      jwt.verify.restore(); //* The substitute method is restored to original

      expect(req).to.have.property("userId");
    });
  });
});

describe("Controllers testing suite.", () => {
  describe("user.controllers.js", () => {
    describe("loginUserController", () => {
      it("should throw an error if database is down.", (done) => {
        const req = {
          body: {
            email: "test@gmail.com",
            password: "test",
          },
        };

        sinon.stub(User, "findOne");

        User.findOne.throws();

        loginUserController(req, {}, () => {}).then((error) => {
          expect(error).to.be.an("error");
          User.findOne.restore();
          done(); //* It tells mocha to wait for the async code to finish.
        });
      });
    });
    describe("userStatusController", () => {
      it("should throws an error if authorization header not found.", (done) => {
        const req = {
          headers: {},
        };

        userStatusController(req, {}, () => {}).then((res) => {
          expect(res).to.be.an("error");
          done();
        });
      });
    });
  });
});
