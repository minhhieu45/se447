const chatService = require("./../service/chat.service");
class Chat {
  addMess = async (req, res) => {
    let result = await chatService.addMess(req.body);
    return res.json(result);
  };
  getAllMess = async (req, res) => {
    let result = await chatService.getAllMess();
    return res.json(result);
  };
  seenMess = async (req, res) => {
    let result = await chatService.seenMess(req.params.id);
    return res.json(result);
  };
  getMessById = async (req, res) => {
    console.log(req.query);

    let result = await chatService.getMessById(req.query.q);
    return res.json(result);
  };
}
module.exports = new Chat();
