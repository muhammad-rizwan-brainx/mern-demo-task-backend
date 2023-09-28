const express = require("express");
const userController = require("../controllers/userController");

const Router = express.Router();
Router.post("/signup", userController.signup);
Router.post("/login", userController.login);
Router.put("/forgotpassword", userController.forgotPassword);
Router.put("/changepassword", userController.changePassword);

module.exports = Router;