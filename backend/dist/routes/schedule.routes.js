"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleRouter = void 0;
var express_1 = __importDefault(require("express"));
var schedule_controller_1 = require("../controllers/schedule.controller");
var client_1 = require("../client");
var schedule_service_1 = require("../services/schedule.service");
// import { IsLoggedIn } from "../guards";
exports.scheduleRouter = express_1.default.Router();
var scheduleService = new schedule_service_1.ScheduleService(client_1.knex);
var scheduleController = new schedule_controller_1.ScheduleController(scheduleService);
exports.scheduleRouter.post("/schedule", scheduleController.getSchedule);
exports.scheduleRouter.post("/schedule/update", scheduleController.updateWhenDrop);
//# sourceMappingURL=schedule.routes.js.map