const mongoose = require("mongoose");
const Task = require("../models/taskModel");

exports.getAllTasks = () => {
  return Task.find();
};

exports.addTask = async (data) => {
  return await Task.create(data);
};

exports.getTask = async (id) => {
  return await Task.findById(id).select("title description isCompleted");
};

exports.updateTask = async (id, payload) => {
  return await Task.updateOne({ _id: id }, { $set: payload });
};

exports.deleteTask = async (id) => {
  return await Task.deleteOne({ _id: id });
};