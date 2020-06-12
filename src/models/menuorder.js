'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuOrder = sequelize.define(
    "MenuOrder",
    {
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Menu",
          key: "id",
        },
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Order",
          key: "id",
        },
      },
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
    },
    {}
  );
  MenuOrder.associate = function(models) {
    // associations can be defined here
  };
  return MenuOrder;
};