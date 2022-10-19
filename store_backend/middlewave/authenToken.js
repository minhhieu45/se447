const jwt = require("jsonwebtoken");
const authenToken = async (req, res, next) => {
  let { token } = req.headers;
  try {
    await jwt.verify(token, process.env.SECRET, (err, result) => {
      if (err) {
        return res.json({
          statusCode: 400,
          message: `Phiên đăng nhập đã hết hạn, vui lòng đăng nhập`,
        });
      }
      req.idUser = result;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = authenToken;
