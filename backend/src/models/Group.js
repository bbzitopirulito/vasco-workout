const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  group: [
    {
      day: Number,
      time: Date,
      limit: String,
      classType: String,
      users: [
        {
          _id: String,
          username: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Group", GroupSchema);
