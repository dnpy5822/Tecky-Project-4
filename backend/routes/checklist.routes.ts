import express from "express";
import { knex } from "../client";
import { CheckListController } from "../controllers/checklist.controller";
import { CheckListService } from "../services/checklist.service";

let checklistService = new CheckListService(knex);
let checklistController = new CheckListController(checklistService);

export const checklistRouter = express.Router();

checklistRouter.get("/checklistPage", checklistController.getCheckList);
checklistRouter.delete("/checklistPage", checklistController.deleteChecklist);
checklistRouter.post("/checklistPage", checklistController.addChecklist);
checklistRouter.post("/checklistPage/check", checklistController.updateCheck);
