const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    date: Date,
});

module.exports = mongoose.model('Schedule', ScheduleSchema);