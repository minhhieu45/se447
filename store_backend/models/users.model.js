const sequelize = require("./../connectDB/connect");
const { DataTypes } = require("sequelize");
const products = async () => {
  const newSequelize = await sequelize.connect();
  const User = newSequelize.define("users", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: "customer",
    },
    address: DataTypes.STRING,
    numberphone: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
  });
  try {
    await User.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
  return User;
};
module.exports = products;
