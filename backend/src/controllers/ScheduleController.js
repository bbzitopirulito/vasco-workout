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

        const user = await User.findOne( {_id: {$ne: userId}} )
        const scheduledUsers = await Schedule.findOne({_id: {$ne: scheduleId}})

        // console.log(user)
        // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        // console.log(scheduledUsers)
                
        // await Schedule.updateOne({_id:scheduleId}, {
        //     $set: { users: scheduledUsers.length > 0 ? [...scheduledUsers.users, {
        //         _id: user._id,
        //         username: user.username
        //     }] : [{ _id: user._id, username: user.username }] }
        // });  
        console.log('here')
        console.log(scheduleId)

        await Schedule.updateOne({_id:scheduleId}, {
            $push: { users: user }
        });       

        const updatedSchedule = await Schedule.findById(scheduleId)

        // const user = await User.findById(user_id);

        console.log(updatedSchedule)

        return res.json(updatedSchedule);            
           
    }
    
};