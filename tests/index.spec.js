/* eslint-disable prefer-template */
/* eslint-disable no-undef */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";

chai.use(chaiHttp);
const { expect } = chai;

describe("API Tests", () => {
  describe("Entry File Tests /", () => {
    it("should return error status when invalid route is reached", (done) => {
      chai
        .request(app)
        .get("/helloworld")
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).eql(
            "Well, will you help build this route? 🤷🏼‍♂️"
          );
          done();
        });
    });
    it("should return a welcome message when the status route is visited", (done) => {
      chai
        .request(app)
        .get("/status")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).eql("Welcome to pizza place");
          done();
        });
    });
  });
});
