"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
var knex_1 = __importDefault(require("knex"));
var env_1 = require("./env");
var configs = require("./knexfile");
var config = configs[env_1.env.NODE_ENV];
exports.knex = (0, knex_1.default)(config);
//# sourceMappingURL=client.js.map