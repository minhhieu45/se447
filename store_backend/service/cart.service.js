let cart = require("./../models/cart");
const cancelProduct = require("./../models/cancelOrderModel");
class Cart {
  getAllProductInCart = async (id) => {
    let cartModel = await cart();
    try {
      let result = await cartModel.findAll({
        where: {
          idUser: id,
        },
      });
      return {
        statusCode: 200,
        result,
      };
    } catch (error) {
      return {
        statusCode: 500,
      };
    }
  };
  cartDelete = async (id) => {
    let cartModel = await cart();
    try {
      cartModel.destroy({
        where: {
          id,
        },
      });
      console.log(`delete successfully !`);
      return {
        statusCode: 200,
        message: `delete successfully !`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `delete faild !`,
      };
    }
  };
  cartUpdate = async (id, quantity) => {
    let cartModel = await cart();
    try {
      await cartModel.update(
        {
          quantity: quantity,
        },
        {
          where: {
            id: Number.parseInt(id),
          },
        }
      );
      return {
        statusCode: 200,
        message: `update successfully`,
        quantity,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `update faild`,
      };
    }
  };
  cancelProducts = async (obj) => {
    let cancelModel = await cancelProduct();
    cancelModel.create(obj);
    try {
      return {
        statusCode: 200,
        message: `Oke ban ei`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `khong ok ban ei`,
      };
    }
  };
  getAllProducts = async () => {
    let cancelModel = await cancelProduct();
    try {
      let result = await cancelModel.findAll();
      return {
        statusCode: 200,
        result,
      };
    } catch (error) {
      return {
        statusCode: 400,
      };
    }
  };
}
module.exports = new Cart();
