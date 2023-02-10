"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRouter = void 0;
var express_1 = __importDefault(require("express"));
var map_service_1 = require("../services/map.service");
var map_controller_1 = require("../controllers/map.controller");
var client_1 = require("../client");
var guards_1 = require("../guards");
exports.mapRouter = express_1.default.Router();
var mapService = new map_service_1.MapService(client_1.knex);
var mapController = new map_controller_1.MapController(mapService);
exports.mapRouter.post("/map", guards_1.IsLoggedIn, mapController.insertEventDateTime);
//# sourceMappingURL=map.routes.js.map