const middlewaveToken = require("./../middlewave/authenToken");
const router = require("express").Router();
const ProductsController = require("./../controllers/products.controller");
router.get("/products", ProductsController.getAllProducts);
router.get("/products/:id", ProductsController.getDetailProduct);
router.delete("/products/:id", ProductsController.deleteProducts);
router.put("/products/:id", ProductsController.updateProduct);
router.post("/products/buy", middlewaveToken, ProductsController.buyProduct);
router.post("/products/add", ProductsController.addProducts);

module.exports = router;
