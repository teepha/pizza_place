import BaseRepository from "./BaseRepository";
import db from "../models";
class MenuRepository extends BaseRepository {
  constructor() {
    super("Menu", db);
  }
}

export default MenuRepository;
