'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.DECIMAL,
    },
    {}
  );
  Menu.associate = function(models) {
    Menu.belongsToMany(models.Order, {
      through: "MenuOrder",
      as: "orders",
      foreignKey: "menu_id",
    });
  };
  return Menu;
};