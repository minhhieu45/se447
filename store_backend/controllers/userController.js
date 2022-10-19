const authen = require("./../authentication/authenticationRegister");
const userService = require("./../service/user.service");
var jwt = require("jsonwebtoken");
const userModel = require("./../models/users.model");
const bcrypt = require("bcrypt");
class User {
  registerUser = async (req, res, next) => {
    let { role, username, email, password, repassword, address, numberphone } =
      req.body;
    console.log(req.body);
    let result = await authen.authencationRegister(
      username,
      email,
      password,
      repassword,
      address,
      numberphone,
      role
    );
    if (result.details) {
      return res.json({
        statusCode: 400,
        message: result.details[0].message,
      });
    }
    let error = await userService.registerUser(result);
    if (error.statusCode === 400) {
      return res.json(error);
    }
    req.error = error;
    next();
    // if (!error) {
    //   delete result.password;
    //   delete result.repassword;
    //   res.json({
    //     statusCode: 200,
    //     message: `Resgiter successfully ! `,
    //     result,
    //   });
    //   return;
    // }
    // res.json(error);
  };

  loginUser = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        statusCode: 400,
        message: `Vui lòng nhập email và mật khẩu`,
      });
    }
    let result = await userService.loginUser({ email, password });
    return res.json(result);
  };
  feedback = async (req, res) => {
    let result = await userService.feedback(req.body);
    res.json(result);
  };
  getAllFeedback = async (req, res) => {
    let result = await userService.getAllFeedback();
    return res.json(result);
  };
  getAllUser = async (req, res) => {
    let result = await userService.getAllUser();
    return res.json(result);
  };
  editUser = async (req, res) => {
    let result = await userService.editUser(req.params.id, req.body);
    return res.json(result);
  };
  deleteUser = async (req, res) => {
    let result = await userService.deleteUser(req.params.id);
    return res.json(result);
  };
  query = async (req, res) => {
    let result = await userService.query();
    res.json(result);
  };
  checkRole = async (req, res) => {
    let user = await userModel();
    let result = await user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!result) {
      return res.json({
        statusCode: 400,
        message: `Tài khoản chưa thoát hệ thống`,
      });
    }
    if (result.role !== "admin") {
      return res.json({
        statusCode: 400,
        message: `Bạn không thể mở cửa sổ để truy cập quản trị viên!`,
      });
    }
    let results = await bcrypt.compare(req.body.password, result.password);
    if (!results) {
      return res.json({
        statusCode: 400,
        message: `Mật khẩu sai vui lòng đăng nhập lại !`,
      });
    }
    return res.json({
      statusCode: 200,
      message: `Chào mừng đến với quản trị viên !`,
    });
  };
  getRegister = async (req, res) => {
    let { token } = req.query;
    try {
      await jwt.verify(token, process.env.SECRET, async (err, result) => {
        if (err) {
          return res.json({
            statusCode: 400,
            message: `Phiên đăng nhập đã hết hạn, vui lòng đăng nhập!`,
          });
        }
        let user = await userModel();
        const salt = bcrypt.genSaltSync(10);
        result.password = await bcrypt.hashSync(result.password, salt);
        await user.create(result);
        return res.send(
          `<a href="http://localhost:4000/login">Nhấn vào đây để đăng nhập</a>`
        );
      });
    } catch (err) {
      console.log(err);
    }
  };
  deleteFeedblack = async (req, res) => {
    console.log(req.params.id);
    let result = await userService.deleteFeedblack(req.params.id);
    return res.json(result);
  };
}
module.exports = new User();
