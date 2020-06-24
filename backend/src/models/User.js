const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  workouts: [Date],
});

module.exports = mongoose.model("User", UserSchema);
