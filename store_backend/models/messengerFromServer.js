const sequelize = require("../connectDB/connect");
const { DataTypes, BOOLEAN } = require("sequelize");
const message = async () => {
  const newSequelize = await sequelize.connect();
  const message = newSequelize.define("messages", {
    subject: DataTypes.STRING,
    message: DataTypes.STRING,
    idUser: DataTypes.STRING,
  });
  try {
    await message.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
  return message;
};
module.exports = message;
