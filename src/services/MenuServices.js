import autoBind from "auto-bind";
import MenuRepository from "../repositories/MenuRepository";
import dotenv from "dotenv";

dotenv.config();
class MenuService {
  constructor() {
    this.menuRepository = new MenuRepository();
    autoBind(this);
  }
  async createAMenu(options) {
    try {
      const { name, price, description } = options;
      const menuDetail = {
        name,
        price,
        description,
      };
      const newMenu = await this.menuRepository.create(menuDetail);
      const { dataValues } = newMenu;

      return { ...dataValues };
    } catch (error) {
      throw error;
    }
  }
  async getOneMenu(id) {
    try {
      const menu = await this.menuRepository.findById(id);
      if (!menu) return false;
      return { menu };
    } catch (error) {
      throw error;
    }
  }
}

export default MenuService;
