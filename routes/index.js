const express = require("express");
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");

const router = express.Router();

router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);

module.exports = router;
