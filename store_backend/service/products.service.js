let cart = require("./../models/cart");
var productsModels = require("./../models/products");
class productsService {
  getAllProducts = async (page) => {
    var productsModels = await require("./../models/products");
    let result = (await productsModels()).findAll({
      offset: 10 * (page - 1),
      limit: 12,
    });
    return result;
  };
  addProducts = async (obj) => {
    console.log(obj);
    var products = await productsModels();
    try {
      await products.create(obj);
      return {
        stateCode: 200,
        message: `Add product successfully !`,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 200,
        message: `Add product failed`,
      };
    }
  };
  getDetailProduct = async (id) => {
    id = parseInt(id);

    var productsModels = await require("./../models/products");
    let result = (await productsModels()).findAll({
      where: {
        id,
      },
    });
    return result;
  };
  buyProduct = async (obj) => {
    let cartModel = await cart();
    let result = await cartModel.create(obj);
    return result;
  };
  deleteProducts = async (id) => {
    var products = await productsModels();
    try {
      products.destroy({
        where: {
          id,
        },
      });
      return {
        statusCode: 200,
        message: `Delete Product Successfully`,
      };
    } catch (error) {
      return {
        statusCode: 200,
        message: `Delete Product Failed`,
      };
    }
  };
  updateProduct = async (obj) => {
    var products = await productsModels();
    try {
      products.update(
        {
          title: obj.title,
          price: obj.price,
          description: obj.description,
          image: obj.image,
        },
        {
          where: {
            id: parseInt(obj.id),
          },
        }
      );
      return {
        statusCode: 200,
        message: `Update Product Successfully !`,
      };
    } catch (error) {
      return {
        statusCode: 200,
        message: `Update Product Failded !`,
      };
    }
  };
}
module.exports = new productsService();
