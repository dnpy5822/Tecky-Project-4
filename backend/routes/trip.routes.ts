import express from "express";
import { TripController } from "../controllers/trip.controller";
import { TripService } from "../services/trip.service";
import { knex } from "../client";
import { IsLoggedIn } from "../guards";

export let tripRoutes = express.Router();

let tripService = new TripService(knex);
let tripController = new TripController(tripService);

tripRoutes.post("/createTrip", IsLoggedIn, tripController.createTrip);
tripRoutes.get("/plansFromServer", IsLoggedIn, tripController.getPlansFromServer);
tripRoutes.get("/savedActivityFromServer", IsLoggedIn, tripController.getSavedActivityFromServer);
tripRoutes.get("/tripListFromServer", IsLoggedIn, tripController.getTripListFromServer)
tripRoutes.post("/checkIsSaved", IsLoggedIn, tripController.checkIsSaved)
tripRoutes.get("/activityDetail", tripController.getActivityDetail)
tripRoutes.post("/insertActivity", IsLoggedIn, tripController.insertActivity)
tripRoutes.delete("/deleteSavedActivity", IsLoggedIn, tripController.deleteSavedActivity)
tripRoutes.post("/searchedActivityDetail", tripController.getSearchedActivityDetail)
tripRoutes.delete("/deleteTrip", IsLoggedIn, tripController.deleteTrip)
tripRoutes.post("/activityDetailPage", tripController.activityDetailPage)
