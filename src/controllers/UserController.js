import UserService from "../services/UserServices";

class UsersController {
  
  static async createUser(req, res) {  
    const userService = new UserService();
    const { role, password, name, username } = req.body;
    try {
      const user = await userService.createAUser({
        role,
        password,
        name,
        username,
      });
      return res.status(201).json({ user, message: "successfully created user" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Unexpected error occured" });
    }
  }
  static async loginUser(req, res){
        const userService = new UserService();
        const { password, username } = req.body;
        try {
          const user = await userService.loginAUser({ password, username });
          if(user){
          return res
            .status(200)
            .json({ user, message: "successfully logged in" });
          }
          return res
            .status(404)
            .json({ error: true, message: "User not found" });
        } catch (error) {
          return res
            .status(500)
            .json({ error: true, message: "Unexpected error occured" });
        }
  }
}
export default UsersController;
