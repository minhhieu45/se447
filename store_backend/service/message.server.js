const message = require("./../models/messengerFromServer");
class MessageServer {
  sendMessageServer = async (obj) => {
    let messageModel = await message();
    try {
      messageModel.create(obj);
      return {
        statusCode: 200,
        message: `Send Feedback Successfully !`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `Send Feedback Failded`,
      };
    }
  };
  getMessById = async (idUser) => {
    let messageModel = await message();
    try {
      let result = await messageModel.findAll({
        where: {
          idUser,
        },
      });
      return {
        statusCode: 200,
        result,
      };
    } catch (error) {
      return {
        statusCode: 400,
      };
    }
  };
}
module.exports = new MessageServer();
