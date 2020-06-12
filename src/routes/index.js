import { Router } from "express";
const { check } = require("express-validator");
import { validator } from "../middlewares/validations";
import UserController from "../controllers/UserController";
import { usernameCheck } from "../middlewares/usernameCheck";
import MenuController from "../controllers/MenuController";
import Tokenization from "../helpers/Tokenization";
import OrderController from "../controllers/OrderController";


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
  usernameCheck,
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
  Tokenization.tokenVerify,
  Tokenization.isAdmin,
  validator,
  MenuController.createMenu
);

router.get("/menu", MenuController.getAllMenu);

router.post(
  "/menu/cart",
  [check("menuIds", "Array of Menu IDs is required").isArray({ min: 1 })],
  validator,
  MenuController.getSomeMenu
);

router.get(
  "/menu/:menuId",
  [
    check("menuId", "Valid Menu ID is required")
      .isInt(),
  ],
  validator,
  MenuController.getAMenu
);

router.post(
  "/orders",
  [
    check("items", "Array of Menus is required").isArray({ min: 1 }),
    check("name", "Name is required").trim().notEmpty(),
    check("surname", "Surname is required").trim().notEmpty(),
    check("address", "Address is required").trim().notEmpty(),
    check("phone_number", "Phone number is required").trim().notEmpty(),
  ],
  validator,
  Tokenization.tokenVerify,
  OrderController.createOrder
  );
router.get(
  "/orders/history",
  Tokenization.tokenVerify,
  OrderController.getAUserOrderHistory,
);

router.get(
  "/orders/:orderId",
  [check("orderId", "Valid Order ID is required").isInt()],
  validator,
  Tokenization.tokenVerify,
  OrderController.getAnOrder
);

export default router;
