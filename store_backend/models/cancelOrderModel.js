const sequelize = require("../connectDB/connect");
const { DataTypes } = require("sequelize");
const cancelproducts = async () => {
  const newSequelize = await sequelize.connect();
  const cancelproducts = newSequelize.define("cancelproducts", {
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
  });
  try {
    await cancelproducts.sync({ alter: false });
  } catch (error) {
    console.log(error);
  }
  return cancelproducts;
};
module.exports = cancelproducts;
