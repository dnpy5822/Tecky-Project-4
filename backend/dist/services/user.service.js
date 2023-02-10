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
exports.UserService = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var env_1 = require("../env");
var UserService = /** @class */ (function () {
    function UserService(knex) {
        this.knex = knex;
    }
    UserService.prototype.createAccount = function (username, password, email) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex
                                .insert({
                                username: username,
                                password_hash: password,
                                email: email,
                                isAdmin: false,
                            })
                                .into("user")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.checkUsernameDup = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("username")
                            .from("user")
                            .where("username", username)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.checkEmailDup = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.select("email").from("user").where("email", email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.findUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("id", "username", "password_hash", "email", "avatar", "isAdmin")
                            .from("user")
                            .where({ username: username })
                            .first()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("id", "username")
                            .from("user")
                            .where({ id: id })
                            .first()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getUser = function (username, email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("id", "username", "email", "avatar")
                            .from("user")
                            .where({ username: username, email: email })
                            .first()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.createJWTToken = function (data, jwtSecret) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, token;
            return __generator(this, function (_a) {
                payload = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    isAdmin: data.isAdmin,
                    avatar: data.avatar,
                };
                token = jwt_simple_1.default.encode(payload, jwtSecret);
                return [2 /*return*/, token];
            });
        });
    };
    UserService.prototype.checkwithFacebook = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var params, res, data, user, user_1, token_1, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = new URLSearchParams();
                        params.set("fields", "name,email,picture");
                        params.set("access_token", accessToken);
                        return [4 /*yield*/, (0, node_fetch_1.default)("https://graph.facebook.com/me?" + params)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        console.log("data", data);
                        if (!data) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getUser(data.name, data.email)];
                    case 3:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.knex
                                .insert({
                                username: data.name,
                                email: data.email,
                                avatar: data.picture.data.url,
                                isAdmin: false,
                            })
                                .into("user")
                                .returning(["id", "username", "email", "avatar", "isAdmin"])];
                    case 4:
                        user_1 = _a.sent();
                        token_1 = this.createJWTToken(user_1, env_1.env.JWT_SECRET);
                        return [2 /*return*/, token_1];
                    case 5:
                        token = this.createJWTToken(user, env_1.env.JWT_SECRET);
                        return [2 /*return*/, token];
                    case 6: return [2 /*return*/, { message: "error on facebook service" }];
                }
            });
        });
    };
    UserService.prototype.checkwithGoogle = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var data, json, user, user_2, token_2, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1.default)("https://www.googleapis.com/oauth2/v2/userinfo", {
                            method: "get",
                            headers: {
                                Authorization: "Bearer ".concat(accessToken),
                            },
                        })];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, data.json()];
                    case 2:
                        json = _a.sent();
                        if (!json) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getUser(json.name, json.email)];
                    case 3:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.knex
                                .insert({
                                username: json.name,
                                email: json.email,
                                avatar: json.picture,
                                isAdmin: false,
                            })
                                .into("user")
                                .returning(["id", "username", "email", "avatar", "isAdmin"])];
                    case 4:
                        user_2 = _a.sent();
                        token_2 = this.createJWTToken(user_2, env_1.env.JWT_SECRET);
                        return [2 /*return*/, token_2];
                    case 5:
                        token = this.createJWTToken(user, env_1.env.JWT_SECRET);
                        return [2 /*return*/, token];
                    case 6: return [2 /*return*/, { message: "error on facebook service" }];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map