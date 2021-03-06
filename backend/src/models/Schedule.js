const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  date: Date,
  limit: Number,
  type: String,
  users: [
    {
      _id: String,
      username: String,
    },
  ],
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
