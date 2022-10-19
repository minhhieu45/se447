const Middlewave = require("./../middlewave/authenToken");
const router = require("express").Router();
const CartController = require("../controllers/cart.controller");
router.get("/cart", Middlewave, CartController.CartUser);
router.delete("/cart/:id", CartController.cartDelete);
router.put("/cart/:id", CartController.cartUpdate);
module.exports = router;
