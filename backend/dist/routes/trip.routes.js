"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRoutes = void 0;
var express_1 = __importDefault(require("express"));
var trip_controller_1 = require("../controllers/trip.controller");
var trip_service_1 = require("../services/trip.service");
var client_1 = require("../client");
var guards_1 = require("../guards");
exports.tripRoutes = express_1.default.Router();
var tripService = new trip_service_1.TripService(client_1.knex);
var tripController = new trip_controller_1.TripController(tripService);
exports.tripRoutes.post("/createTrip", guards_1.IsLoggedIn, tripController.createTrip);
exports.tripRoutes.get("/plansFromServer", guards_1.IsLoggedIn, tripController.getPlansFromServer);
exports.tripRoutes.get("/savedActivityFromServer", guards_1.IsLoggedIn, tripController.getSavedActivityFromServer);
exports.tripRoutes.get("/tripListFromServer", guards_1.IsLoggedIn, tripController.getTripListFromServer);
exports.tripRoutes.post("/checkIsSaved", guards_1.IsLoggedIn, tripController.checkIsSaved);
exports.tripRoutes.get("/activityDetail", tripController.getActivityDetail);
exports.tripRoutes.post("/insertActivity", guards_1.IsLoggedIn, tripController.insertActivity);
exports.tripRoutes.delete("/deleteSavedActivity", guards_1.IsLoggedIn, tripController.deleteSavedActivity);
exports.tripRoutes.post("/searchResult", tripController.getSearchResult);
//# sourceMappingURL=trip.routes.js.map