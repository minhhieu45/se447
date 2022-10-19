const sequelize = require("../connectDB/connect");
const { DataTypes } = require("sequelize");
const chat = async () => {
  const newSequelize = await sequelize.connect();
  const chat = newSequelize.define("chat", {
    idUser: DataTypes.STRING,
    message: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  try {
    await chat.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
  return chat;
};
module.exports = chat;
