const Schedule = require('../models/Schedule');

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
    }
    
};