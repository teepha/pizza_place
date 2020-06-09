import autoBind from "auto-bind";
import MenuRepository from "../repositories/MenuRepository";
import dotenv from "dotenv";

dotenv.config();

/**
 * Creates an instance of MenuService.
 */
class MenuService {
  /**
   * Creates an instance of MenuService.
   * @param {object} param
   * @memberof MenuService
   */
  constructor() {
    this.menuRepository = new MenuRepository();
    autoBind(this);
  }

  /**
   * Creates a new menu
   * @param {object} - options
   *@returns {object} - new created menu
   */
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
}

export default MenuService;
