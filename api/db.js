const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
  email: { type: String, unique: true },
  createdDate: Date,
});

const adminSchmea = new Schema({
  username: String,
  password: String,
  email: { type: String, unique: true },
});
const tasklistSchema = new Schema({
  taskId: ObjectId,
  userId: ObjectId,
  title: String,

  date: Date,
  duration: Number,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchmea);
const tasklistModel = mongoose.model("task", tasklistSchema);

module.exports = {
  userModel,
  adminModel,
  tasklistModel,
};