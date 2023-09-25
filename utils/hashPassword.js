const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(password, 10)
      .then((result) => resolve(result))
      .catch((err) => reject("Failed to hash password"));
  });
};

module.exports = {
  hashPassword,
};
