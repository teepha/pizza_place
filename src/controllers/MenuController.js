import MenuService from "../services/MenuServices";

class MenuController {

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
