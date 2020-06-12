'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      user_id: DataTypes.INTEGER,
      address: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {}
  );
  Order.associate = function (models) {
    // Order.belongsTo(models.User, {
    //   as: "users",
    //   foreignKey: "user_id",
    // });
    Order.belongsToMany(models.Menu, {
      through: "MenuOrder",
      as: "menus",
      foreignKey: "order_id",
    });
  };
  return Order;
};