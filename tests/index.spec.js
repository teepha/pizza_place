/* eslint-disable prefer-template */
/* eslint-disable no-undef */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";

chai.use(chaiHttp);
const { expect } = chai;
let validToken, adminValidToken, menuId, orderId;
const userCredentials = {
  name: "lateefat test",
  username: "lateefat",
  password: "lateefat",
  role: "user",
};
const adminCredentials = {
  name: "chidimma test",
  username: "adminlateefat",
  password: "adminlateefat",
  role: "admin",
};
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
describe("Auth Endpoints Tests /", () => {
  before((done) => {
    chai
      .request(app)
      .post("/api/v1/sign-up")
      .send(adminCredentials)
      .end((err, res) => {
        adminValidToken = res.body.user.token;
        done();
      });
  });
    before((done) => {
      chai
        .request(app)
        .post("/api/v1/sign-up")
        .send(userCredentials)
        .end((err, res) => {
          validToken = res.body.user.token;
          done();
        });
    });
  it("should return not allow dunplicate username", (done) => {
    chai
      .request(app)
      .post("/api/v1/sign-up")
      .send(userCredentials)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal("username is taken");
        done();
      });
  });
  it("should return validation error when field is missing", (done) => {
    const newUser = {
      username: "teepha",
      password: "teepha",
      role: "user",
    };
    chai
      .request(app)
      .post("/api/v1/sign-up")
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });
  it("should return validation error when wrong role", (done) => {
    const newUser = {
      name: "name here",
      username: "teepha",
      password: "teepha",
      role: "manager",
    };
    chai
      .request(app)
      .post("/api/v1/sign-up")
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });
    it("should login a valid user", (done) => {
      chai
        .request(app)
        .post("/api/v1/login")
        .send(adminCredentials)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
});
describe("Menu Endpoints Tests ", () => {
  it("Admin should create a menu successfully", (done) => {
    const menu = {
      name: "BBQ",
      description: "sweet and chillied",
      price: 10,
    };
    chai
      .request(app)
      .post("/api/v1/menu")
      .send(menu)
      .set({ Authorization: adminValidToken })
      .end((err, res) => {
        menuId = res.body.menu.id;
        expect(res.status).to.equal(201);
        done();
      });
  });
  it("Non Admin should not be able to create a menu", (done) => {
    const menu = {
      name: "BBQ",
      description: "sweet and chillied",
      price: 10,
    };
    chai
      .request(app)
      .post("/api/v1/menu")
      .send(menu)
      .set({ Authorization: validToken })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
    it("User should retriev a menu successfully", (done) => {
      chai
        .request(app)
        .get(`/api/v1/menu/${menuId}`)
        .set({ Authorization: validToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
});
describe("Order Endpoints Tests ", () => {
  it("Authenticated user should be able to place an order", (done) => {
    const order = {
      items: [
        {
          id: menuId,
          quantity: 2,
        }
      ],
      name: "Lateephat",
      address: "Ajayi olaiya",
      surname: "Amuda",
      phone_number: "0987565433",
    };
    chai
      .request(app)
      .post("/api/v1/orders")
      .send(order)
      .set({ Authorization: validToken })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it("Authenticated user should retrieve order history", (done) => {
    chai
      .request(app)
      .get("/api/v1/orders/history")
      .set({ Authorization: validToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
    it("Unauthenticated user not should retrieve order history", (done) => {
      chai
        .request(app)
        .get("/api/v1/orders/history")
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
});          
});

