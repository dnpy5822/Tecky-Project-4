"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var listening_on_1 = require("listening-on");
var user_routes_1 = require("./routes/user.routes");
var trip_routes_1 = require("./routes/trip.routes");
var map_routes_1 = require("./routes/map.routes");
var schedule_routes_1 = require("./routes/schedule.routes");
var inputbar_routes_1 = require("./routes/inputbar.routes");
var shareschedule_routes_1 = require("./routes/shareschedule.routes");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", function (req, res) {
    res.end("Hello");
});
app.use(user_routes_1.userRoutes);
app.use(trip_routes_1.tripRoutes);
app.use(map_routes_1.mapRouter);
app.use(schedule_routes_1.scheduleRouter);
app.use(inputbar_routes_1.inputBarRouter);
app.use(shareschedule_routes_1.shareScheduleRouter);
app.use(express_1.default.static("public"));
var PORT = 8080;
app.listen(PORT, function () {
    (0, listening_on_1.print)(PORT);
});
//# sourceMappingURL=server.js.map