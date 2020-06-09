import autoBind from 'auto-bind';
import UserRepository from '../repositories/UserRepository';
import { passwordHash, comparePassword } from '../helpers/passwordHash';
import Tokenization from '../helpers/Tokenization';
import dotenv from 'dotenv';

dotenv.config();


/**
   * Creates an instance of UserService.
   */
class UserService {
  /**
   * Creates an instance of UserService.
   * @param {object} param
   * @memberof UserService
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
      const { name, password, username, role } = options;
      const hashedPassword = await passwordHash(password, 10);
      const userDetail = {
        name,
        password: hashedPassword,
        username,
        role,
      };
      const newUser = await this.userRepository.create(userDetail);
      const { id } = newUser.dataValues;
      const token = await Tokenization.generateToken(
        { id, username, role, name },
        process.env.EXPIRE
      );
      return { id, name, role, username, token };
    } catch (error) {
      throw error;
    }
  }
  async loginAUser(options) {
    try {
      const { password, username } = options;

      const user = await this.userRepository.find({
        where: {
          username,
        },
      });
      if (user && comparePassword(password, user.password)) {
        const { id, name, role } = user;
        const token = await Tokenization.generateToken(
          { id, username, role, name },
          process.env.EXPIRE
        );
        return { id, name, role, username, token };
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
