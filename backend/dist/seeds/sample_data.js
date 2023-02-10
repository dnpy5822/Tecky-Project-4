"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
var client_1 = require("../client");
var hash_1 = require("../hash");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var hash_password, userID, scheduleID, tagID, activityID;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Deletes ALL existing entries
                return [4 /*yield*/, knex("content").del()];
                case 1:
                    // Deletes ALL existing entries
                    _a.sent();
                    return [4 /*yield*/, knex("activity_tag").del()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex("country").del()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex("activity").del()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, knex("tag").del()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, knex("user_schedule").del()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, knex("schedule").del()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, knex("user").del()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, (0, hash_1.hashPassword)("demodemo")];
                case 9:
                    hash_password = _a.sent();
                    return [4 /*yield*/, seedRow("user", {
                            username: "demoacc",
                            password_hash: hash_password,
                            email: "demo@gmail.com",
                            isAdmin: "false",
                        })];
                case 10:
                    userID = _a.sent();
                    return [4 /*yield*/, seedRow("schedule", {
                            name: "Japan Road Trip",
                            privacy: "public",
                        })];
                case 11:
                    scheduleID = _a.sent();
                    return [4 /*yield*/, seedRow("user_schedule", { user_id: userID, schedule_id: scheduleID })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, seedRow("tag", { name: "theme park" })];
                case 13:
                    tagID = _a.sent();
                    return [4 /*yield*/, seedRow("activity", {
                            name: "Hong Kong Disneyland",
                            opening_time: "10:30",
                            closing_time: "20:30",
                            description: "The Disney Theme Park - A Traditional of Fun for Everyone",
                            rating: 4,
                            type: "spot",
                            latitude: "22.312771",
                            longitude: "114.041931",
                        })];
                case 14:
                    activityID = _a.sent();
                    return [4 /*yield*/, seedRow("country", { name: "Japan", activity_id: activityID })];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, seedRow("activity_tag", { tag_id: tagID, activity_id: activityID })];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, seedRow("content", {
                            schedule_id: scheduleID,
                            day: "2023-01-25",
                            activity_id: activityID,
                            start_time: "11:00",
                            end_time: "19:00",
                        })];
                case 17:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.seed = seed;
function seedRow(table, data) {
    return __awaiter(this, void 0, void 0, function () {
        var rows, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, client_1.knex)(table).select("id").where(data).first()];
                case 1:
                    rows = _a.sent();
                    if (rows) {
                        return [2 /*return*/, rows.id];
                    }
                    return [4 /*yield*/, client_1.knex.insert(data).into(table).returning("id")];
                case 2:
                    id = (_a.sent())[0].id;
                    return [2 /*return*/, id];
            }
        });
    });
}
//# sourceMappingURL=sample_data.js.map