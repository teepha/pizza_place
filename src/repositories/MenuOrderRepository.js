import BaseRepository from "./BaseRepository";
import db from "../models";
class MenuOrderRepository extends BaseRepository {
  constructor() {
    super("MenuOrder", db);
  }
}

export default MenuOrderRepository;
