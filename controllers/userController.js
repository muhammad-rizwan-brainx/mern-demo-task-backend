const bcrypt = require("bcrypt");
const createToken = require("../utils/createToken");
const userService = require("../services/userService");
const sendEmail = require("../services/emailService");
const userValidate = require("../services/userVAlidationService");

exports.signup = async (req, res, next) => {
  try {
    const{userName, email, password} = req.body;
    const validationErrors = userValidate.validateSignupCredentials(userName, email, password);
    if (validationErrors.length > 0) {
      return res.status(422).json({ errors: validationErrors });
    }
    const userExists = await userService.findUser({email});
    if (userExists) {
      return res.status(422).json({
        Message: "Mail Exists Already",
      });
    }
    await userService.createUser({userName, email, password});
    res.status(201).json({
      Message: "User Created",
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const validationErrors = userValidate.validateLoginCredentials(req.body);
    if (validationErrors.length > 0) {
      return res.status(422).json({ errors: validationErrors });
    }
    const {email, password} = req.body;
    const user = await userService.findUser({email});
    if (!user) {
      return res.status(401).json({
        Message: "User Doesnt Exist",
      });
    }
    const respons = await bcrypt.compare(password, user.password);
    if (respons) {
      const token = await createToken.createToken(email, user._id)
      return res.status(200).json({
        message: "successful",
        token: token,
      });
    }
    res.status(401).json({
      Message: "Auth Fail",
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { resetPasswordToken, newPassword } = req.body;
    const user = await userService.findUser({resetPasswordToken});
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }
    await userService.updatePassword(user, newPassword);
    res.status(200).json(
      { 
        message: "Password changed successfully"
       });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to process change password request" });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const validationErrors = userValidate.validateForgotPasswordCredentials(req.body);
    if (validationErrors.length > 0) {
      return res.status(422).json({ errors: validationErrors });
    }
    const { email } = req.body;
    const user = await userService.findUser({email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = await createToken.createToken(email, user._id)
    const expiration = Date.now() + 3600000;
    await userService.updateResetToken(user, resetToken, expiration);
    await sendEmail({resetToken, email})
    res.status(200).json({ message: "Password reset link sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to process forgot password request" });
  }
};

