const express = require("express");

const UserController = require("./controllers/UserController");

const ScheduleController = require("./controllers/ScheduleController");

const routes = express.Router();

routes.post("/newschedule", ScheduleController.store);
routes.post("/newgroup", ScheduleController.createGroup);
routes.post("/newuser", UserController.store);
routes.get("/user", UserController.getUser);
routes.get("/schedules", ScheduleController.getSchedules);
routes.delete("/deleteschedule", ScheduleController.deleteSchedule);
routes.put("/scheduleuser", ScheduleController.scheduleUser);
routes.put("/unscheduleuser", ScheduleController.unscheduleUser);

module.exports = routes;
