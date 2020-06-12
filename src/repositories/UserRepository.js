import BaseRepository from './BaseRepository';
import db from '../models';

class UserRepository extends BaseRepository {
  constructor() {
    super('User', db);
  }
}

export default UserRepository;
