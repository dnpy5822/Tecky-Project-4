"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var dotenv_1 = require("dotenv");
var populate_env_1 = __importDefault(require("populate-env"));
(0, dotenv_1.config)();
exports.env = {
    NODE_ENV: "development",
    DB_NAME: "",
    DB_USERNAME: "",
    DB_PASSWORD: "",
    DB_HOST: "localhost",
    DB_PORT: "",
    JWT_SECRET: "",
    POSTGRES_DB: "",
    POSTGRES_PASSWORD: "",
    POSTGRES_USER: "",
    POSTGRES_HOST: "",
};
(0, populate_env_1.default)(exports.env, { mode: "halt" });
//# sourceMappingURL=env.js.map