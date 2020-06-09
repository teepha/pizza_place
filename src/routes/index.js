import { Router } from "express";
// import Validator from "../middlewares/Validator";
import UsersController from "../controllers/UserController";

const router = Router();

router.post("/sign-up", UsersController.createUser);

export default router;
