import autoBind from "auto-bind";
import dotenv from "dotenv";
import OrderRepository from "../repositories/OrderRepository";
import MenuOrderRepository from "../repositories/MenuOrderRepository";
import MenuRepository from "../repositories/MenuRepository";

dotenv.config();

class MenuService {
  constructor() {
    this.menuRepository = new MenuRepository();
    this.menuOrderRepository = new MenuOrderRepository();
    this.orderRepository = new OrderRepository();
    autoBind(this);
  }
  async createAnOrder(options) {
    try {
      const { items } = options;
      const newOrder = await this.orderRepository.create(options);
      const { id } = newOrder.dataValues;

      items.forEach(async (item) => {
        const menu = await this.menuRepository.findById(item.id);
        if (!menu) {
          return false;
        }
        const menuOrderDetail = {
          quantity: item.quantity,
          price: menu.price * item.quantity,
          menu_id: item.id,
          order_id: id,
        };

        await this.menuOrderRepository.create(menuOrderDetail);
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
  async getSingleOrder({ user_id, orderId }) {
    try {
      const order = await this.orderRepository.findUserOrder(orderId, user_id);
      if (!order) return false;
      return { order };
    } catch (error) {      
      throw error;
    }
  }
  async getUserOdersHistory(user_id) {
    try {
      const orders = await this.orderRepository.findUserOrderHistory(user_id);
      if (!orders) return false;
      return { orders };
    } catch (error) {
      throw error;
    }
  }
}

export default MenuService;
