const chai = require("chai");
let server = require("../index");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

//Very basic mocha test, to test the shorten route.


describe("API REQUEST TESTS", () => {
    
  it("Testing POST CREATE URL", (done) => {
    chai
      .request(`localhost:5000/api/shorten?https://www.google.co.uk/`)
      .post("/")
      .set("Content-Type", "application/json")
      .end(function (err, response) {
          encodedURL = response.body;
        response.should.have.status(201);
        done();
      });
  });


});