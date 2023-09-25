const mongoose = require("mongoose");
const uri = process.env.MONGO_DB;
module.exports = mongoose.connect(uri);
