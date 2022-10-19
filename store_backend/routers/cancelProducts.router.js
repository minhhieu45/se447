const router = require("express").Router();
const CartController = require("../controllers/cart.controller");
router.post("/cancel-product", CartController.cancelProducts);
router.get("/cancel-product", CartController.getAllProducts);
module.exports = router;
