import express from "express";
import { knex } from "../client";
import { InputBarController } from "../controllers/inputbar.controller";
import { InputBarService } from "../services/inputbar.service";

export const inputBarRouter = express.Router();

let inputBarService = new InputBarService(knex);
let inputBarController = new InputBarController(inputBarService);

inputBarRouter.post("/inputBar", inputBarController.inputSearch);
