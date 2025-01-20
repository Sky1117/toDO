const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isComplete: {
    type: Boolean,
    default: false,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
