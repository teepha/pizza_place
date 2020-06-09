import { Router } from "express";
const { check } = require("express-validator");
import { userValidator } from "../middlewares/validations";
import UsersController from "../controllers/UserController";


const router = Router();

router.post(
  "/sign-up",
  [
    check("name", "Name is required").trim().notEmpty(),
    check("username", "Username is required").trim().notEmpty(),
    check("role", "User role is required").trim().notEmpty(),
    check("password", "Password is required").trim().notEmpty(),
    check("password", "Minimum password length is 5 characters").isLength({
      min: 5,
    }),
  ],
  userValidator,
  UsersController.createUser
);

router.post(
  "/login",
  [
    check("username", "Username is required").trim().notEmpty(),
    check("password", "Password is required").trim().notEmpty(),
    check("password", "Minimum password length is 5 characters").isLength({
      min: 5,
    }),
  ],
  userValidator,
  UsersController.loginUser
);

export default router;
