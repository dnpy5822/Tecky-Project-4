"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareScheduleRouter = void 0;
var express_1 = __importDefault(require("express"));
var client_1 = require("../client");
var shareschedule_controller_1 = require("../controllers/shareschedule.controller");
var shareschedule_service_1 = require("../services/shareschedule.service");
exports.shareScheduleRouter = express_1.default.Router();
var shareScheduleService = new shareschedule_service_1.ShareScheduleService(client_1.knex);
var shareScheduleController = new shareschedule_controller_1.ShareScheduleController(shareScheduleService);
exports.shareScheduleRouter.get("/scheduleDetail", shareScheduleController.getSchedule);
//# sourceMappingURL=shareschedule.routes.js.map