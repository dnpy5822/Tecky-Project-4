import express from "express";
import { knex } from "../client";
import { AdminController } from "../controllers/admin.controller";
import { AdminService } from "../services/admin.service";

export const adminRouter = express.Router();

let adminService = new AdminService(knex);
let adminController = new AdminController(adminService);

adminRouter.get("/userlist", adminController.getUserList);
adminRouter.post("/warning", adminController.sendWarning);
adminRouter.post("/ban", adminController.banUser);
adminRouter.post("/unban", adminController.unbanUser);
adminRouter.get("/activeUser", adminController.activeUser);

// Below is for personal page

adminRouter.get("/userinfo", adminController.userInfo);
