const sequelize = require("../connectDB/connect");
const { DataTypes } = require("sequelize");
const feedback = async () => {
  const newSequelize = await sequelize.connect();
  const feedback = newSequelize.define("feedback", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
  });
  try {
    await feedback.sync({ alter: false });
  } catch (error) {
    console.log(error);
  }
  return feedback;
};
module.exports = feedback;
