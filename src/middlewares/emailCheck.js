import UserRepository from "../repositories/UserRepository";

export const emailCheck = async (req, res, next) => {
  const { username } = req.body;
  const userRepository = new UserRepository();
  const user = await userRepository.find({ where: {
      username,
    }});
    if(user){
      return res.status(409).json({ message: "username is taken" });
    }
    return next();
}
