"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputBarRouter = void 0;
var express_1 = __importDefault(require("express"));
var client_1 = require("../client");
var inputbar_controller_1 = require("../controllers/inputbar.controller");
var inputbar_service_1 = require("../services/inputbar.service");
exports.inputBarRouter = express_1.default.Router();
var inputBarService = new inputbar_service_1.InputBarService(client_1.knex);
var inputBarController = new inputbar_controller_1.InputBarController(inputBarService);
exports.inputBarRouter.post("/inputBar", inputBarController.inputSearch);
//# sourceMappingURL=inputbar.routes.js.map