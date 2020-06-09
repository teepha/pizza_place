import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/** Token Authenticate Class */
class Tokenization {
  /**
   *Generate Token Method
   * @static
   * @param {object} userDetails
   * @param {string} expires
   * @returns {string} returns token
   * @memberof Tokenization
   */
  static generateToken(userDetails, expires) {
    const token = jwt.sign(userDetails, process.env.SECRET, {
      expiresIn: expires,
    });
    return token;
  }

  /**
   *Verfify Token Method
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {function} returns an object with status and method property
   * @memberof Tokenization
   */
  static async tokenVerify(req, res, next) {
    const token =
      req.headers.authorization ||
      req.headers["x-access-token"] ||
      req.query.token
    if (!token) {
      return res.status(401).send({
        status: "error",
        message: "No token provided",
      });
    }
    try {
      const verifyUser = await jwt.verify(token, process.env.SECRET);
      req.verifyUser = verifyUser;
      return next();
    } catch (error) {
      return res.status(401).send({
        status: "error",
        message: "Unauthorized token",
      });
    }
  }
}

export default Tokenization;
