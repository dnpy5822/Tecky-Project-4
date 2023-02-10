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
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex.schema.hasTable('user')];
                case 1:
                    if (!!(_a.sent())) return [3 /*break*/, 3];
                    return [4 /*yield*/, knex.schema.createTable('user', function (table) {
                            table.increments('id');
                            table.string('username', 60).nullable();
                            table.string('password_hash', 60).nullable();
                            table.string('email', 255).notNullable();
                            table.string('avatar', 2048).nullable();
                            table.boolean('isAdmin').notNullable();
                            table.timestamps(false, true);
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, knex.schema.hasTable('tag')];
                case 4:
                    if (!!(_a.sent())) return [3 /*break*/, 6];
                    return [4 /*yield*/, knex.schema.createTable('tag', function (table) {
                            table.increments('id');
                            table.string('name', 50).notNullable();
                            table.timestamps(false, true);
                        })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, knex.schema.hasTable('comment')];
                case 7:
                    if (!!(_a.sent())) return [3 /*break*/, 9];
                    return [4 /*yield*/, knex.schema.createTable('comment', function (table) {
                            table.increments('id');
                            table.string('title', 50).notNullable();
                            table.text('context').notNullable();
                            table.integer('rating').notNullable();
                            table.timestamps(false, true);
                        })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [4 /*yield*/, knex.schema.hasTable('activity')];
                case 10:
                    if (!!(_a.sent())) return [3 /*break*/, 12];
                    return [4 /*yield*/, knex.schema.createTable('activity', function (table) {
                            table.increments('id');
                            table.string('name', 100).notNullable();
                            table.timestamp('opening_time').nullable();
                            table.timestamp('closing_time').nullable();
                            table.text('description').nullable();
                            table.string('type', 20).notNullable();
                            table.integer('rating').nullable();
                            table.integer('likes').nullable();
                            table.string('latitude', 20).notNullable();
                            table.string('longitude', 20).notNullable();
                            table.integer('tag_id').unsigned().nullable().references('tag.id');
                            table.integer('comment_id').unsigned().nullable().references('comment.id');
                            table.timestamps(false, true);
                        })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [4 /*yield*/, knex.schema.hasTable('country')];
                case 13:
                    if (!!(_a.sent())) return [3 /*break*/, 15];
                    return [4 /*yield*/, knex.schema.createTable('country', function (table) {
                            table.increments('id');
                            table.string('name', 50).notNullable();
                            table.integer('activity_id').unsigned().notNullable().references('activity.id');
                            table.timestamps(false, true);
                        })];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15: return [4 /*yield*/, knex.schema.hasTable('schedule')];
                case 16:
                    if (!!(_a.sent())) return [3 /*break*/, 18];
                    return [4 /*yield*/, knex.schema.createTable('schedule', function (table) {
                            table.increments('id');
                            table.string('name', 50).notNullable();
                            table.string('type', 20).nullable();
                            table.string('privacy', 20).notNullable();
                            table.timestamps(false, true);
                        })];
                case 17:
                    _a.sent();
                    _a.label = 18;
                case 18: return [4 /*yield*/, knex.schema.hasTable('content')];
                case 19:
                    if (!!(_a.sent())) return [3 /*break*/, 21];
                    return [4 /*yield*/, knex.schema.createTable('content', function (table) {
                            table.increments('id');
                            table.integer('schedule_id').unsigned().notNullable().references('schedule.id');
                            table.string('day', 10).notNullable();
                            table.string('action', 100).nullable();
                            table.integer('activity_id').unsigned().nullable().references('activity.id');
                            table.timestamp('start_time').nullable();
                            table.timestamp('end_time').nullable();
                            table.timestamps(false, true);
                        })];
                case 20:
                    _a.sent();
                    _a.label = 21;
                case 21: return [4 /*yield*/, knex.schema.hasTable('user_schedule')];
                case 22:
                    if (!!(_a.sent())) return [3 /*break*/, 24];
                    return [4 /*yield*/, knex.schema.createTable('user_schedule', function (table) {
                            table.increments('id');
                            table.integer('user_id').unsigned().notNullable().references('user.id');
                            table.integer('schedule_id').unsigned().notNullable().references('schedule.id');
                            table.timestamps(false, true);
                        })];
                case 23:
                    _a.sent();
                    _a.label = 24;
                case 24: return [2 /*return*/];
            }
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex.schema.dropTableIfExists('user_schedule')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('content')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('schedule')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('country')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('activity')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('comment')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('tag')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('user')];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.down = down;
//# sourceMappingURL=20230119075133_auto-migrate.js.map