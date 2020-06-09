import { validationResult } from "express-validator";

const roles = ["user", "admin"];

  export const userSignUpValidator = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.isEmpty());
    
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { role } = req.body;
    const userRole = roles.includes(role);
    if (!userRole) {
      return res
        .status(422)
        .json({ message: "This user role does not exist", error: true });
    }
    return next();
  }

  


