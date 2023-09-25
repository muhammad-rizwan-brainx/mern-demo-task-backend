const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    authToken: {
        type: String,
    },
});

module.exports = mongoose.model("Auth", authSchema);
