const sequelize = require("../connectDB/connect");
const { DataTypes } = require("sequelize");
const carts = async () => {
  const newSequelize = await sequelize.connect();
  const carts = newSequelize.define("carts", {
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    
    image: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
  });
  try {
    await carts.sync({ force: false });
  } catch (error) {
    console.log(error);
  }
  return carts;
};
module.exports = carts;
