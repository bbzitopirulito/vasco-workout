const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    date: Date,
    // users: [{
    //     _id: String,
    //     username: String
    // }]
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

module.exports = mongoose.model('Schedule', ScheduleSchema);