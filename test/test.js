const { expect } = require("chai");
const authChecker = require("../middleware/authChecker");

require("dotenv").config();

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
  it("*authChecker.js* : The authorization header is present in request or not.", () => {
    const req = {
      headers: {
        authorization: null,
      },
    };

    expect(authChecker.bind(null, req, {}, () => {})).to.throw(
      "Authorization header not found."
    );
  });
});
