const cartService = require("./../service/cart.service");
class Cart {
  CartUser = async (req, res) => {
    let { id } = req.idUser;
    let cart = await cartService.getAllProductInCart(id);
    return res.json(cart);
  };
  cartDelete = async (req, res) => {
    let { id } = req.params;
    let cart = await cartService.cartDelete(id);
    return res.json(cart);
  };
  cartUpdate = async (req, res) => {
    let { id } = req.params;
    let { quantity } = req.body;
    let cart = await cartService.cartUpdate(id, quantity);
    res.json(cart);
  };
  cancelProducts = async (req, res) => {
    let result = await cartService.cancelProducts(req.body);
    return res.json(result);
  };
  getAllProducts = async (req, res) => {
    let result = await cartService.getAllProducts();
    return res.json(result)
  };
}
module.exports = new Cart();
