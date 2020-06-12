import BaseRepository from "./BaseRepository";
import db from "../models";
class OrderRepository extends BaseRepository {
  constructor() {
    super("Order", db);
  }
  async findUserOrder(id, user_id) {
    const query = {
      where: {
        id,
        user_id,
      },
      include: [
        {
          model: db.Menu,
          as: "menus",
          required: false,
          through: {
            model: db.MenuOrder,
            as: "menuOrders",
            attributes: ["quantity", "price"],
          },
        },
      ],
    };
    try {
      const data = await this.model.findOne(query);
      if (!data) return false;
      return data;
    } catch (error) {
      throw error;
    }
  }
  async findUserOrderHistory(user_id) {
    const query = {
      where: {
        user_id,
      },
      include: [
        {
          model: db.Menu,
          as: "menus",
          required: false,
          through: {
            model: db.MenuOrder,
            as: "menuOrders",
            attributes: ["quantity", "price"],
          },
        },
      ],
    };
    try {
      const data = await this.model.findAll(query);
      if (!data) return false;
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default OrderRepository;
