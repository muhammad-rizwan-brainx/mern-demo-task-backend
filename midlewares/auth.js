const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const salt = process.env.SALT;

module.exports = async(req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization.split(" ")[1], salt);
    const{_id} = decode;
    req.userData = await userService.findUser({_id});
    next();
  } catch (error) {
    res.status(500).json({
      Message: "Auth Error",
    });
  }
};
