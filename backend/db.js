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
  serialno: ObjectId,
  userId: ObjectId,
  title: String,
  description: String,
  date: Date,
  startTime: Date,
  stopTime: Date,
  timeduration: Number,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchmea);
const tasklistModel = mongoose.model("task", tasklistSchema);

module.exports = {
  userModel,
  adminModel,
  tasklistModel,
};
