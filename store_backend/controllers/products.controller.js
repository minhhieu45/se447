const { response } = require("express");
const productsService = require("./../service/products.service");
class Products {
  getAllProducts = async (req, res) => {
    const { page } = req.query;
    const products = await productsService.getAllProducts(page || 1);
    res.json(products);
  };
  getDetailProduct = async (req, res) => {
    const { id } = req.params;
    const product = await productsService.getDetailProduct(id);
    res.json(product);
  };
  buyProduct = async (req, res) => {
    req.body.idUser = req.idUser.id;
    delete req.body.id;
    let cart = await productsService.buyProduct(req.body);
    return res.json({
      statusCode: 200,
      message: `Buy product successfully !`,
      cart,
    });
  };
  addProducts = async (req, res) => {
    let result = await productsService.addProducts(req.body);
    return res.json(result);
  };
  deleteProducts = async (req, res) => {
    let result = await productsService.deleteProducts(req.params.id);
    return res.json(result);
  };
  updateProduct = async (req, res) => {
    let result = await productsService.updateProduct(req.body);
    return res.json(result);
  };
}
module.exports = new Products();
