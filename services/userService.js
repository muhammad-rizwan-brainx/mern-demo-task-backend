const User = require("../models/userModel");

const createUser = async (data) => {
  return await User.create(data);
};

const findUser = async (condition) => {
  return await User.findOne(condition);
};

const updatePassword = async (user, newPassword) => {
  user.password = newPassword;
  user.resetToken = null;

  return await user.save();
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