const User = require("../models/userModel");

const createUser = async (data) => {
  return await User.create(data);
};

const findUser = async (condition) => {
  try {
    return await User.findOne(condition);
  } catch (err) {
    console.log("here", err);
  }
};

const updatePassword = async (user, newPassword) => {
  try {
    user.password = newPassword;
    user.resetPasswordToken = null;
    return await user.save();
  } catch (err) {
    console.log(err);
  }
};

const updateResetToken = async (user, resetToken, expiration) => {
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = expiration;
  return await user.save();
};

module.exports = {
  updateResetToken,
  updatePassword,
  findUser,
  createUser,
};
