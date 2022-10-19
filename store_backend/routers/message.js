const Middlewave = require("../middlewave/authenToken");
const router = require("express").Router();
const messController = require("./../controllers/message.controller");
router.post("/message", messController.sendMess);
router.get("/message/:id", messController.getMessById);
module.exports = router;
