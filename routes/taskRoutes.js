const express = require("express");
const checkAuth = require("../midlewares/auth");
const taskController = require("../controllers/taskController");

const Router = express.Router();

Router.use(checkAuth);

Router.post("/", taskController.addTask);
Router.get("/", taskController.getAllTasks);
Router.get("/:taskID", taskController.getTask);
Router.patch("/:taskID", taskController.updateTask);
Router.delete("/:taskID", taskController.deleteTask);

module.exports = Router;