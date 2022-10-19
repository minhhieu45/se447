const sequelize = require("../connectDB/connect");
const { DataTypes, BOOLEAN } = require("sequelize");
const orders = async () => {
  const newSequelize = await sequelize.connect();
  const orders = newSequelize.define("orders", {
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    image: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    numberphone: DataTypes.STRING,
    active: {
      type: BOOLEAN,
      defaultValue: true,
    },
  });
  try {
    await orders.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
  return orders;
};
module.exports = orders;
