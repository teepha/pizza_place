/* eslint-disable no-useless-constructor */
import MenuService from "../services/MenuServices";

/**
 * Creates an instance of MenuController.
 */
class MenuController {
  /**
   * Retrieves menu details
   * @param {object} req
   * @param {object} res
   *@returns {object} - menu
   */
  // eslint-disable-next-line class-methods-use-this
  static async createMenu(req, res) {
    const menuService = new MenuService();
    const { name, price, description } = req.body;
    try {
      const menu = await menuService.createAMenu({
        name,
        price,
        description,
      });
      return res
        .status(201)
        .json({ menu, message: "successfully created menu" });
    } catch (error) {
      return res.json(error);
    }
  }
}
export default MenuController;
