import autoBind from 'auto-bind';
import UserRepository from '../repositories/UserRepository';
import { passwordHash } from '../helpers/passwordHash';
import Tokenization from '../helpers/Tokenization';
import dotenv from 'dotenv';

dotenv.config();


/**
   * Creates an instance of UserController.
   */
class UserService {
  /**
   * Creates an instance of UserController.
   * @param {object} param
   * @memberof UsersController
   */
  constructor() {
    this.userRepository = new UserRepository();
    autoBind(this);
  }

  /**
   * Creates a new user
   * @param {object} - options
   *@returns {object} - new created user
   */
  async createAUser(options) {
    try {
      const {
        name,
        password,
        username,
        role,
      } = options;
      const hashedPassword = await passwordHash(password, 10);
      const userDetail = {
        name,
        password: hashedPassword,
        username,
        role,
      };
      const newUser = await this.userRepository.create(userDetail);
      const { id  } = newUser.dataValues;
      const token = await Tokenization.generateToken(
       { id, username, role, name },
        process.env.EXPIRE,
        );
      return { id, name, role,  username, token };
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
