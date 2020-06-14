const express = require('express');

const UserController = require('./controllers/UserController');

const ScheduleController = require('./controllers/ScheduleController');

const routes = express.Router();

//user
// routes.get('/user', UserController.getUser);
// routes.get('/userbyid', UserController.showById); 
// routes.delete('/deleteuser', UserController.delete);
// routes.get('/username', UserController.getUsername);
// routes.post('/users', UserController.store);
// routes.put('/updateuser', UserController.update);

//schema
routes.post('/newschedule', ScheduleController.store);
routes.post('/newuser', UserController.store);
routes.get('/user', UserController.getUser);
routes.get('/schedules', ScheduleController.getSchedules)
routes.delete('/deleteschedule', ScheduleController.deleteSchedule)

module.exports = routes;