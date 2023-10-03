const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const salt = process.env.SALT;

module.exports = async(req, res, next) => {
  try {
    console.log(req.headers.authorization)
    const decode = jwt.verify(req.headers.authorization.split(" ")[1], salt);
    const{_id} = decode;
    console.log("here")
    req.userData = await userService.findUser({_id});
    next();
  } catch (error) {
    res.status(500).json({
      message: "Auth Error",
    });
  }
};
