import { Router } from "express";
const { check } = require("express-validator");
import { validator } from "../middlewares/validations";
import UserController from "../controllers/UserController";
import { emailCheck } from "../middlewares/emailCheck";
import MenuController from "../controllers/MenuController";


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
  validator,
  emailCheck,
  UserController.createUser
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
  validator,
  UserController.loginUser
);

router.post(
  "/menu",
  [
    check("name", "Name is required").trim().notEmpty(),
    check("description", "Description is required").trim().notEmpty(),
    check("price", "Price is required").trim().notEmpty(),
  ],
  validator,
  MenuController.createMenu
);

export default router;
