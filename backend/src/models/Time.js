const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema({
  time: String,
  max: Number,
  people: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Time", TimeSchema);
