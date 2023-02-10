import express from "express";
import { ScheduleController } from "../controllers/schedule.controller";
import { knex } from "../client";
import { ScheduleService } from "../services/schedule.service";
// import { IsLoggedIn } from "../guards";

export const scheduleRouter = express.Router();

let scheduleService = new ScheduleService(knex);
let scheduleController = new ScheduleController(scheduleService);

scheduleRouter.post("/schedule", scheduleController.getSchedule);
scheduleRouter.post("/schedule/update", scheduleController.updateWhenDrop);
scheduleRouter.post(
  "/schedule/delete",
  scheduleController.deleteWhenDoubleClick
);
