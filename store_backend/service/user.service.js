const userModeds = require("./../models/users.model");
const feedback = require("./../models/feedback.model");
const orders = require("./../models/order");
const bcrypt = require("bcrypt");
const auth = require("./../authentication/authenticationRegister");
const db = require("./../connectDB/connect");
var jwt = require("jsonwebtoken");
require("dotenv").config();
class userService {
  getAllUser = async () => {
    let user = await userModeds();
    try {
      let resultUser = await user.findAll();
      return {
        statusCode: 200,
        message: `Get User successfully !`,
        userList: resultUser,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `Get user failed`,
      };
    }
  };
  registerUser = async (userInfo) => {
    let user = await userModeds();
    try {
      let findUser = await user.findOne({
        where: {
          email: userInfo.email,
        },
      });
      if (findUser) {
        return {
          statusCode: 400,
          message: `The account already exists in the system`,
        };
      }
      return userInfo;
    } catch (error) {
      return error;
    }
  };

  loginUser = async (objUser) => {
    let user = await userModeds();
    try {
      let findUser = await user.findOne({
        where: {
          email: objUser.email,
        },
      });
      if (!findUser) {
        return {
          statusCode: 400,
          message: `Email does not exist, you must register`,
        };
      }
      let result = await bcrypt.compare(objUser.password, findUser.password);
      if (!result) {
        return {
          statusCode: 400,
          message: `Password is wrong, please re-enter !`,
        };
      }
      var token = await jwt.sign(
        { email: findUser.email, id: findUser.id },
        process.env.SECRET
      );
      return {
        statusCode: 200,
        message: `Logged in successfully !`,
        user: findUser,
        token,
      };
    } catch (error) {
      console.log(error);
    }
  };
  feedback = async (obj) => {
    const feedbackModel = await feedback();
    try {
      await feedbackModel.create(obj);
      return {
        statusCode: 200,
        message: `send feedback successfully ~~`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `send feedback faild ~~`,
      };
    }
  };

  getAllFeedback = async () => {
    const feedbackModel = await feedback();
    try {
      let feedback = await feedbackModel.findAll();
      let count = await feedbackModel.count();
      return {
        statusCode: 200,
        message: `get  feedback successfully ~~`,
        feedback,
        count,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `get feedback faild ~~`,
      };
    }
  };
  deleteFeedblack = async (id) => {
    const feedbackModel = await feedback();
    try {
      await feedbackModel.destroy({
        where: {
          id,
        },
      });
      return {
        statusCode: 200,
        message: `Delete feedback successfully !`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `Delete feedback failded`,
      };
    }
  };
  editUser = async (id, info) => {
    let result = await auth.authencationRegister(
      info.username,
      info.email,
      info.password,
      info.repassword,
      info.address,
      info.numberphone
    );
    if (result.details) {
      return {
        statusCode: 400,
        message: result.details[0].message,
      };
    }
    let user = await userModeds();
    try {
      const salt = bcrypt.genSaltSync(10);
      try {
        info.password = await bcrypt.hashSync(info.password, salt);
      } catch (error) {
        console.log(error);
      }
      console.log(info);
      user.update(
        {
          username: info.username,
          email: info.email,
          password: info.password,
          role: info.role || "customer",
          address: info.address,
          numberphone: info.numberphone || "",
          image:
            info.image ||
            "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
        },
        {
          where: {
            id,
          },
        }
      );

      return {
        statusCode: 200,
        message: `Edit successfully`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `Edit failed`,
      };
    }
  };
  deleteUser = async (id) => {
    let user = await userModeds();
    try {
      user.destroy({
        where: {
          id,
        },
      });
      return {
        statusCode: 200,
        message: `delete user successfully !`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `delete user failed`,
      };
    }
  };
  query = async () => {
    let ccdb = await db.connect();
    let result =
      await ccdb.query(`select orders.quantity, orders.price, orders.idUser, users.id
    from orders
    inner join users on orders.idUser = users.id`);
    let arr = result[0];
    let obj = {};
    arr.forEach((e) => {
      obj[e.id] = e.id;
    });
    let newKey = [];
    for (const key in obj) {
      newKey.push(key);
    }
    let newObjj = {};
    newKey.forEach((e) => {
      let mang = arr.filter((arr) => arr.id === parseInt(e));

      mang = mang.reduce((prev, curr) => {
        return prev + parseFloat(curr.price);
      }, 0);
      newObjj[e] = mang;
    });
    return newObjj;
  };
}
module.exports = new userService();
