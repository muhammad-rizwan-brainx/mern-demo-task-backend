const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            require: true,
        },
        isCompleted: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Task", TaskSchema);
