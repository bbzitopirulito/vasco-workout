const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { username, password, role, workouts } = req.body;            

        let user = await User.findOne({ password });

        if(!user) {
            user = await User.create({ 
                username,
                password,
                role,
                workouts, 
            })
            return res.json(user);
        }        
        return res.json("exists");

    },

    async showById(req, res) {
        const { user_id } = req.headers;

        const user = await User.findById(user_id);        

        return res.json(user);
    },

    async getUser(req, res) {
        const { username, password } = req.headers;        

        const user = await User.findOne().where('username').equals(username).where('password').equals(password);

        if(!user) {
            return res.json("does not exist");
        }        

        return res.json(user);
    },

    async getUsername(req, res) {
        const { username } = req.headers;        

        const user = await User.findOne().where('username').equals(username);


        if(user) {
            return res.json(user);
        } 
        return res.json("null");
    },

    async update(req, res) {
        const { username, password } = req.body;        
        const { user_id } = req.headers;     

        const usedUsername = await User.findOne( {_id: {$ne: user_id}} ).where('username').equals(username);
        const usedPassword = await User.findOne( {_id: {$ne: user_id}} ).where('password').equals(password);
        
        if(usedUsername === null && usedPassword === null) {                    
            await User.updateOne({_id:user_id}, {
                $set: { username, password }
            });               
            
            const user = await User.findById(user_id);
            
            return res.json(user);            
        } else {
            return res.json('Username or password already used by another user.')
        }        
    },

    async delete(req, res) {
        const { user_id } = req.headers;        

        await User.deleteOne().where('_id').equals(user_id).then(() => {
            return res.json('deleted');
        });                
    },
};