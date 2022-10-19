const messageServer = require("./../service/message.server");
class Message {
  sendMess = async (req, res) => {
    let result = await messageServer.sendMessageServer(req.body);
    return res.json(result);
  };
  getMessById = async (req, res) => {
    let result = await messageServer.getMessById(+req.params.id);
    return res.json(result);
  };
}
module.exports = new Message();
