"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.userRoutes = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user.controller");
var user_service_1 = require("../services/user.service");
var client_1 = require("../client");
exports.userRoutes = express_1.default.Router();
exports.userService = new user_service_1.UserService(client_1.knex);
var userController = new user_controller_1.UserController(exports.userService);
exports.userRoutes.post("/signup", userController.signup);
exports.userRoutes.post("/login/password", userController.login);
exports.userRoutes.post("/login/facebook", userController.loginwithFacebook);
exports.userRoutes.post("/login/google", userController.loginwithGoogle);
//# sourceMappingURL=user.routes.js.map