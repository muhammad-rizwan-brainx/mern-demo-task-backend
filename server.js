const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()
const DB = require("./config/database");
const routes = require("./routes/index");

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", routes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

DB.then(() => {
  console.log("Database connected successfully");
  app.listen(port, console.log(`Server started on PORT:  ${port}`));
});
