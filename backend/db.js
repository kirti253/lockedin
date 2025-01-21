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

const UserModel = mongoose.model("user", userSchema);
const AdminModel = mongoose.model("admin", adminSchmea);
const TasklistModel = mongoose.model("task", tasklistSchema);

module.exports = {
  UserModel,
  AdminModel,
  TasklistModel,
};
