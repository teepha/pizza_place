import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class Tokenization {

  static generateToken(userDetails, expires) {
    const token = jwt.sign(userDetails, process.env.SECRET, {
      expiresIn: expires,
    });
    return token;
  }

  static async tokenVerify(req, res, next) {
    const token =
      req.headers.authorization ||
      req.headers["x-access-token"] ||
      req.query.token;
    if (!token) {
      return res.status(401).send({
        error: true,
        message: "No token provided",
      });
    }
    try {
      const verifyUser = await jwt.verify(token, process.env.SECRET);
      req.verifyUser = verifyUser;
      return next();
    } catch (error) {
      return res.status(401).send({
        error: true,
        message: "Unauthorized token",
      });
    }
  }
  static async isAdmin(req, res, next) {
    const { role } = req.verifyUser;
    if(role !== "admin"){
      return res.status(401).send({
        message: "Unauthorized user",
        error: true,
      });
    }
    return next();
  }
}

export default Tokenization;
