const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema({
    day: String,
    hours: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Time'
    }]
});

module.exports = mongoose.model('Day', DaySchema);