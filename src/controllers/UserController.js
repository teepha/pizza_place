/* eslint-disable no-useless-constructor */
import UserService from "../services/UserServices";

/**
   * Creates an instance of UserController.
   */
class UsersController {
  
  /**
     * Retrieves user details
     * @param {object} req
     * @param {object} res
     *@returns {object} - user
     */
  // eslint-disable-next-line class-methods-use-this
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
      return res.json(error);
    }
  }

}
export default UsersController;
