const Schedule = require('../models/Schedule');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { date } = req.body; 
        
        let ndate = new Date(date)

        ndate = ndate.setHours(ndate.getHours() + 1)

        let schedule = await Schedule.create({ 
            date: ndate,            
        })
        return res.json(schedule);                     
    },

    async getSchedules(req, res) {
        let schedules = await Schedule.find()

        return res.json(schedules)
    },

    async deleteSchedule(req, res) {
        const { _id } = req.headers;

        await Schedule.deleteOne().where('_id').equals(_id)
            .then(() => res.json(true))
            .catch(() => false)
    }, 

    async scheduleUser(req, res) {
        const { userId, scheduleId } = req.body;

        const user = await User.findById(userId)
        const schedule = await Schedule.findById(scheduleId)

        if (schedule.users.filter(f => f._id === userId).length === 0) {
            await Schedule.updateOne({_id:scheduleId}, {
                $push: { users: { _id: user._id, username: user.username } }
            });       
            const updatedSchedule = await Schedule.findById(scheduleId)

            return res.json(updatedSchedule);            
        } else {
            return res.json(false)
        }
    },

    async unscheduleUser(req, res) {
        const { userId, scheduleId } = req.body;

        const user = await User.findById(userId)
        const schedule = await Schedule.findById(scheduleId)

        
        await Schedule.updateOne({_id:scheduleId}, {
            $pullAll: { users: [{ _id: user._id, username: user.username }] }
        });       
        const updatedSchedule = await Schedule.findById(scheduleId)

        return res.json(updatedSchedule);            
    }
    
};