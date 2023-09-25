const jwt = require("jsonwebtoken");
const salt = process.env.SALT;
const createToken = async (email, id) => {
    return jwt.sign(
        {
          email,
          id
        },
        salt,
        {
          expiresIn: "1h",
        }
      );
  };

  module.exports = {
    createToken
  };