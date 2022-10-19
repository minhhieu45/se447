const router = require("express").Router();
const chatController = require("../controllers/chat.controller");
router.post("/chat", chatController.addMess);
router.get("/chat", chatController.getAllMess);
router.put("/chat/:id", chatController.seenMess);
router.get("/chat/id", chatController.getMessById);
module.exports = router;
