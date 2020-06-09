import BaseRepository from "./BaseRepository";
import db from "../models";
/**
 * @description BaseRepository
 * @class BaseRepository
 */
class MenuRepository extends BaseRepository {
  /**
   * MenuRepository constructor
   */
  constructor() {
    super("Menu", db);
  }
}

export default MenuRepository;
