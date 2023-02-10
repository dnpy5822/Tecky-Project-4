import express from "express";
import { MapService } from "../services/map.service";
import { MapController } from "../controllers/map.controller";
import { knex } from "../client";
import { IsLoggedIn } from "../guards";

export const mapRouter = express.Router();

let mapService = new MapService(knex);
let mapController = new MapController(mapService);

mapRouter.post("/map", IsLoggedIn, mapController.insertEventDateTime);
mapRouter.get("/map", mapController.getLocation);
