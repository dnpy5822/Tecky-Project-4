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
exports.TripController = void 0;
var date_fns_1 = require("date-fns");
var TripController = /** @class */ (function () {
    function TripController(tripService) {
        var _this = this;
        this.tripService = tripService;
        this.createTrip = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var values, userId, isDup, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        values = req.body;
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!userId) {
                            return [2 /*return*/, res.status(403).json({
                                    status: false,
                                    message: "You need to login before using this service",
                                })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.tripService.checkDuplicate(values.nameOfTrip, userId)];
                    case 2:
                        isDup = _b.sent();
                        if (isDup.length >= 1) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "Name already in use, please try another name",
                                })];
                        }
                        return [4 /*yield*/, this.tripService.createTrip(values, userId)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({
                                status: true,
                                message: "Create Trip Successfully. let's plan it now!",
                            })];
                    case 4:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                status: false,
                                message: String(error_1),
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getPlansFromServer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, planResult, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!userId) {
                            return [2 /*return*/, res.status(403).json({
                                    status: false,
                                    message: "You need to login before using this service",
                                })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.tripService.getPlansFromServer(userId)];
                    case 2:
                        planResult = _b.sent();
                        return [2 /*return*/, res.status(200).json(planResult)];
                    case 3:
                        error_2 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                error: String(error_2),
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getSavedActivityFromServer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, savedActivityResult, error_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!userId) {
                            return [2 /*return*/, res.status(403).json({
                                    status: false,
                                    message: "You need to login before using this service",
                                })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.tripService.getSavedActivityFromServer(userId)];
                    case 2:
                        savedActivityResult = _b.sent();
                        return [2 /*return*/, res.status(200).json(savedActivityResult)];
                    case 3:
                        error_3 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                error: String(error_3),
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getTripListFromServer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, tripResult, error_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        if (!userId) {
                            return [2 /*return*/, res.status(403).json({
                                    status: false,
                                    message: "You need to login before using this service",
                                })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.tripService.getTripListFromServer(userId)];
                    case 2:
                        tripResult = _b.sent();
                        return [2 /*return*/, res.status(200).json(tripResult)];
                    case 3:
                        error_4 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                error: String(error_4),
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.checkIsSaved = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var activityId, userId, isSaved, error_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        activityId = req.body;
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        console.log("activityId from controller: ", activityId);
                        if (!userId) {
                            return [2 /*return*/, res.status(403).json({
                                    status: false,
                                    message: "You need to login before using this service",
                                })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.tripService.checkIsSaved(userId, activityId.data)];
                    case 2:
                        isSaved = _b.sent();
                        console.log("isSaved from controller: ", isSaved);
                        return [2 /*return*/, res.status(200).json(isSaved)];
                    case 3:
                        error_5 = _b.sent();
                        console.log("error: ", error_5);
                        return [2 /*return*/, res.status(500).json({
                                error: String(error_5),
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getActivityDetail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var activityDetail, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tripService.getActivityDetail()];
                    case 1:
                        activityDetail = _a.sent();
                        return [2 /*return*/, res.status(200).json(activityDetail)];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                error: String(error_6),
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.insertActivity = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, userId, activityId, tripId, eventDate, eventStartTime, eventEndTime, dataToInsert, error_7;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = req.body;
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        console.log("insertActivity from controller: ", data);
                        activityId = data.activityId;
                        tripId = data.tripId;
                        eventDate = (0, date_fns_1.addHours)(new Date(data.eventDate), 8).toISOString().substring(0, 10);
                        console.log("eventDate", eventDate);
                        eventStartTime = new Date(data.eventStartTime).toString().substring(16, 21);
                        eventEndTime = new Date(data.eventEndTime).toString().substring(16, 21);
                        dataToInsert = {
                            activityId: activityId,
                            tripId: tripId,
                            eventDate: eventDate,
                            eventStartTime: eventStartTime,
                            eventEndTime: eventEndTime,
                        };
                        console.log("dataToInsert: ", dataToInsert);
                        if (!userId) {
                            return [2 /*return*/, res.status(403).json({
                                    status: false,
                                    message: "You need to login before using this service",
                                })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.tripService.insertActivity(dataToInsert)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({
                                status: true,
                                message: "Saved",
                            })];
                    case 3:
                        error_7 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                status: false,
                                message: String(error_7),
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteSavedActivity = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var activityId, userId, error_8;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        activityId = req.body.data;
                        console.log("DELETE", activityId);
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        // console.log("deleteActivity from controller: ", data);
                        if (!userId) {
                            return [2 /*return*/, res.status(403).json({
                                    status: false,
                                    message: "You need to login before using this service",
                                })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.tripService.deleteSavedActivity(activityId, userId)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({
                                status: true,
                                message: "Successfully unsafe activity",
                            })];
                    case 3:
                        error_8 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                status: false,
                                message: String(error_8),
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getSearchResult = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var keyword, searchResult, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyword = req.body.data;
                        console.log(keyword);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.tripService.getSearchResult(keyword)];
                    case 2:
                        searchResult = _a.sent();
                        return [2 /*return*/, res.status(200).json(searchResult)];
                    case 3:
                        error_9 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                error: String(error_9),
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return TripController;
}());
exports.TripController = TripController;
//# sourceMappingURL=trip.controller.js.map