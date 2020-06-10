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
      return res
        .status(500)
        .json({ error: true, message: "Unexpected error occured" });
    }
  }

  static async getAMenu(req, res) {
    const menuService = new MenuService();
    const { menuId } = req.params;
    try {
      const menu = await menuService.getOneMenu(menuId);
      if (!menu) {
        return res
          .status(404)
          .json({ error: true, message: "Menu does not exist" });
      }
      return res
        .status(200)
        .json({ menu, message: "successfully retrieves a menu" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Unexpected error occured" });
    }
  }
  static async getAllMenu(req, res) {
    const menuService = new MenuService();
    try {
      const menus = await menuService.getMenu();
      if (!menus) {
        return res
          .status(404)
          .json({ error: true, message: "No Menu was found" });
      }
      return res
        .status(200)
        .json({ menus, message: "Successfully retrieves all menus" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Unexpected error occured" });
    }
  }
  static async getSomeMenu(req, res) {
    const menuService = new MenuService();
    const { menuIds } = req.body;
    try {
      const menu = await menuService.getSomeMenu(menuIds);
      if (!menu) {
        return res
          .status(404)
          .json({ error: true, message: "Menu does not exist" });
      }
      return res
        .status(200)
        .json({ menu, message: "successfully retrieves menu items" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Unexpected error occured" });
    }
  }
}
export default MenuController;
