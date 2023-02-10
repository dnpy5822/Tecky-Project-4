import express from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { knex } from "../client";

export let userRoutes = express.Router();

export let userService = new UserService(knex);
let userController = new UserController(userService);

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login/password", userController.login);
userRoutes.post("/login/facebook", userController.loginwithFacebook);
userRoutes.post("/login/google", userController.loginwithGoogle);
