import OrderService from "../services/OrderServices";

class OrderController {

  static async createOrder(req, res) {
    const orderService = new OrderService();
    const { id } = req.verifyUser;
    const { items, name, surname, address, phone_number } = req.body;
    try {
      const menu = await orderService.createAnOrder({
        items,
        name,
        surname,
        address,
        phone_number,
        user_id: id,
      });

      if (!menu) {
        return res
          .status(404)
          .json({
            error: true,
            message: "One or more of the requested menu does not exist",
          });
      }
      return res
        .status(201)
        .json({ menu, message: "successfully placed orders" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Unexpected error occured" });
    }
  }

  static async getAnOrder(req, res) {
    const orderService = new OrderService();
    const { id } = req.verifyUser;
    const { orderId } = req.params;
    try {
      const order = await orderService.getSingleOrder({ orderId, user_id: id });
      if (!order) {
        return res
          .status(404)
          .json({ error: true, message: "You do not have this order" });
      }
      return res
        .status(200)
        .json({ order, message: "successfully retrieves order" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Unexpected error occured" });
    }
  }
  static async getAUserOrderHistory(req, res) {
    const orderService = new OrderService();
    const { id } = req.verifyUser;
    try {
      const orders = await orderService.getUserOdersHistory(id);
      if (!orders) {
        return res
          .status(404)
          .json({ error: true, message: "You do not have this order" });
      }
      return res
        .status(200)
        .json({ orders, message: "successfully retrieves order" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Unexpected error occured" });
    }
  }
}

export default OrderController;
