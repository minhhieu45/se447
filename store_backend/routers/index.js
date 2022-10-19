const products = require("./products");
const users = require("./users");
const cart = require("./cart");
const orders = require("./orders");
const mess = require("./message");
const cancel = require("./cancelProducts.router");
const chat = require("./chat")
module.exports = (app) => {
  app.use("/", products);
  app.use("/", users);
  app.use("/", cart);
  app.use("/", orders);
  app.use("/", mess);
  app.use("/", cancel);
  app.use("/", chat);
};
