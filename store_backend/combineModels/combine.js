const products = require("./../models/products");
const users = require("./../models/users.model");
const cart = require("./../models/cart");
const orders = require("./../models/order");
const feedback = require("./../models/feedback.model");
const mess = require("./../models/messengerFromServer");
const cancelProducts = require("./../models/cancelOrderModel");
const chat = require("./../models/chat")
const createModel = async () => {
  try {
    await products();
    await users();
    await cart();
    await orders();
    await feedback();
    await mess();
    await cancelProducts();
    await chat();
    console.log(`create model successfully !`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createModel };
