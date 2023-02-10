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
exports.ScheduleController = void 0;
var date_fns_1 = require("date-fns");
var ScheduleController = /** @class */ (function () {
    function ScheduleController(scheduleService) {
        var _this = this;
        this.scheduleService = scheduleService;
        this.getSchedule = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var schedule_id, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schedule_id = req.body.schedule_id;
                        if (!schedule_id) {
                            return [2 /*return*/, res.status(400).json({ message: "no data to controller" })];
                        }
                        return [4 /*yield*/, this.scheduleService.getSchedule(schedule_id)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                result: data,
                            })];
                }
            });
        }); };
        this.updateWhenDrop = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, day, startTime, endTime, contentID;
            return __generator(this, function (_a) {
                data = req.body.data;
                console.log("data to controller", data);
                day = (0, date_fns_1.addHours)(new Date(data.start), 8).toISOString().substring(0, 10);
                startTime = (0, date_fns_1.addHours)(new Date(data.start), 8)
                    .toISOString()
                    .substring(11, 16);
                endTime = (0, date_fns_1.addHours)(new Date(data.end), 8)
                    .toISOString()
                    .substring(11, 16);
                contentID = data.event.resource;
                // console.log("day", day);
                // console.log("startTime", startTime);
                // console.log("endTime", endTime);
                if (!data) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "no output received from controller" })];
                }
                this.scheduleService.updateSchedule(day, startTime, endTime, contentID);
                return [2 /*return*/, res
                        .status(200)
                        .json({ message: "successfully fetched to controller" })];
            });
        }); };
    }
    return ScheduleController;
}());
exports.ScheduleController = ScheduleController;
// function formatDate(input: string) {
//   let day = `${input.substring(6, 10)}-${input.substring(
//     3,
//     5
//   )}-${input.substring(0, 2)}`;
//   let time = input.substring(12, 14) + input.substring(15, 17);
//   return { day, time };
// }
//# sourceMappingURL=schedule.controller.js.map