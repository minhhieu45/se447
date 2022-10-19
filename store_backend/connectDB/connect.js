const { Sequelize } = require("sequelize");
require("dotenv").config();
// Option 1: Passing a connection URI

// Option 2: Passing parameters separately (other dialects)
module.exports = {
  connect: async () => {
    const sequelize = new Sequelize(
      process.env.DATABASE,
      process.env.USER_NAME,
      process.env.PASS_WORD,
      {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        port: process.env.PORT_DB,
      }
    );
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
    return sequelize;
  },
};
