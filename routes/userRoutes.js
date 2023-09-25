const express = require("express");
const userController = require("../controllers/userController");

const Router = express.Router();
Router.post("/signup", userController.signup);
Router.post("/login", userController.login);
Router.post("/forgotpassword", userController.forgotPassword);
Router.post("/changepassword", userController.changePassword);

module.exports = Router;