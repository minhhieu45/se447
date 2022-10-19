const chat = require("./../models/chat");
class Chat {
  addMess = async (obj) => {
    let chatModel = await chat();
    try {
      chatModel.create(obj);
      return {
        statusCode: 200,
        message: `Create Message successfully !`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `Create Messga failded !
            `,
      };
    }
  };
  getAllMess = async (obj) => {
    let chatModel = await chat();
    try {
      let result = await chatModel.findAll();
      return {
        result,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `Create Messga failded !
            `,
      };
    }
  };
  getMessById = async (id) => {
    let chatModel = await chat();
    try {
      let result = await chatModel.findAll({
        where: {
          idUser: id,
        },
      });
      return {
        result,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `Create Messga failded !
            `,
      };
    }
  };
  seenMess = async (id) => {
    console.log(id);

    let chatModel = await chat();
    try {
      await chatModel.update(
        {
          active: false,
        },
        {
          where: {
            idUser: id,
          },
        }
      );
      return {
        statusCode: 200,
      };
    } catch (error) {
      return {
        statusCode: 400,
      };
    }
  };
}
module.exports = new Chat();
