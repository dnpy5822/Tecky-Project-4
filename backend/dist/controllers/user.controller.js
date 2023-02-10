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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var hash_1 = require("../hash");
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var env_1 = require("../env");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        var _this = this;
        this.userService = userService;
        this.signup = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, username, password, password_confirm, email, user, checkEmail, hashedPassword;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password, password_confirm = _a.password_confirm, email = _a.email;
                        console.log("pw confirm:", password_confirm);
                        if (!username) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "Username is required",
                                })];
                        }
                        if (!password) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "Password is required",
                                })];
                        }
                        if (username.length < 6) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "Username must be at least 6 characters",
                                })];
                        }
                        if (password.length < 8) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "Password must be at least 8 characters",
                                })];
                        }
                        return [4 /*yield*/, this.userService.checkUsernameDup(username)];
                    case 1:
                        user = _b.sent();
                        if (user.length >= 1) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    type: "username",
                                    message: "The username has been registered",
                                })];
                        }
                        return [4 /*yield*/, this.userService.checkEmailDup(email)];
                    case 2:
                        checkEmail = _b.sent();
                        if (checkEmail.length >= 1) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    type: "email",
                                    message: "The email has been registered",
                                })];
                        }
                        return [4 /*yield*/, (0, hash_1.hashPassword)(password)];
                    case 3:
                        hashedPassword = _b.sent();
                        return [4 /*yield*/, this.userService.createAccount(username, hashedPassword, email)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({
                                status: true,
                                message: "Successfully registered. Please login and enjoy our services. Have a nice day!",
                            })];
                }
            });
        }); };
        this.login = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, username, password, user, isPasswordMatched, payload, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, username = _a.username, password = _a.password;
                        console.log(req.body);
                        return [4 /*yield*/, this.userService.findUser(username)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            res.status(400);
                            return [2 /*return*/, res.json({
                                    status: false,
                                    message: "Username is incorrect",
                                })];
                        }
                        return [4 /*yield*/, (0, hash_1.checkPassword)(password, user.password_hash)];
                    case 2:
                        isPasswordMatched = _b.sent();
                        if (!isPasswordMatched) {
                            res.status(400);
                            return [2 /*return*/, res.json({
                                    status: false,
                                    message: "Incorrect password",
                                })];
                        }
                        payload = {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            isAdmin: user.isAdmin,
                            avatar: user.avatar,
                        };
                        token = jwt_simple_1.default.encode(payload, env_1.env.JWT_SECRET);
                        return [2 /*return*/, res.status(200).json({
                                status: true,
                                message: "Successfully logged in",
                                token: token,
                            })];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(400).json({
                                status: false,
                                error: error_1,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.loginwithFacebook = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        result = req.body.result;
                        if (!result.accessToken) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userService.checkwithFacebook(result.accessToken)];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, res.status(200).json({ token: token })];
                    case 2: return [2 /*return*/, res.status(400).json({
                            status: false,
                            message: "Unable to retrieve to Facebook AccessToken",
                        })];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        return [2 /*return*/, res
                                .status(500)
                                .json({ message: "Invalid error in Facebook controller" })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.loginwithGoogle = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, token, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        result = req.body.result;
                        if (!result.access_token) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userService.checkwithGoogle(result.access_token)];
                    case 1:
                        token = _a.sent();
                        console.log("received token on google controller", token);
                        return [2 /*return*/, res.status(200).json({ token: token })];
                    case 2: return [2 /*return*/, res.status(400).json({
                            status: false,
                            message: "Unable to retrieve to Google AccessToken",
                        })];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        return [2 /*return*/, res
                                .status(500)
                                .json({ message: "Invalid error in Google controller" })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map