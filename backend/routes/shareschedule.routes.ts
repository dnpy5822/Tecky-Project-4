import express from "express";
import { knex } from "../client";
import { ShareScheduleController } from "../controllers/shareschedule.controller";
import { ShareScheduleService } from "../services/shareschedule.service";

export const shareScheduleRouter = express.Router();

let shareScheduleService = new ShareScheduleService(knex);
let shareScheduleController = new ShareScheduleController(shareScheduleService);

shareScheduleRouter.get("/scheduleDetail", shareScheduleController.getSchedule);
shareScheduleRouter.get(
  "/commentRecord",
  shareScheduleController.commentRecord
);
shareScheduleRouter.post("/comment", shareScheduleController.comment);
shareScheduleRouter.post(
  "/updatecomment",
  shareScheduleController.updateComment
);
shareScheduleRouter.post(
  "/deletecomment",
  shareScheduleController.deleteComment
);
