const OrdersCotroller = require("./../controllers/orders.controllers");
const middlewaveAuthor = require("./../middlewave/authenToken");
const router = require("express").Router();
router.post("/orders", middlewaveAuthor, OrdersCotroller.orders);
router.get("/orders/", OrdersCotroller.getAllOrders);
router.get("/orders/:id", OrdersCotroller.getOrdersById);
router.put("/orders/:id", OrdersCotroller.updateIsActive);
router.delete("/orders/:id", OrdersCotroller.destroyOrder);
module.exports = router;
