const sequelize = require("./../connectDB/connect");
const { DataTypes } = require("sequelize");
const products = async () => {
  const newSequelize = await sequelize.connect();
  const products = newSequelize.define("products", {
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
  });
  try {
    await products.sync({ alter: false });
  } catch (error) {
    console.log(error);
  }
  return products;
};
module.exports = products;
