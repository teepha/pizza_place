import BaseRepository from './BaseRepository';
import db from '../models';
/**
 * @description BaseRepository
 * @class BaseRepository
 */
class UserRepository extends BaseRepository {
  /**
   * UserRepository constructor
   */
  constructor() {
    super('User', db);
  }
}
export default UserRepository;
