"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var typeorm_1 = require("typeorm");
var Refresh_1 = require("../entity/Refresh");
var User_1 = require("../entity/User");
Promise.resolve().then(function () { return __importStar(require("dotenv/config")); });
var refresh = function (cookieRT) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, userIdx, user, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Refresh_1.Refresh)
                    .createQueryBuilder("refresh")
                    .where("refresh.hashedIdx = :hashedIdx", {
                    hashedIdx: cookieRT,
                })
                    .getOne()];
            case 1:
                refreshToken = _a.sent();
                jsonwebtoken_1.default.verify(refreshToken.token, process.env.SHA_RT, function (err, decoded) {
                    if (!err) {
                        userIdx = decoded.id;
                    }
                });
                if (!userIdx) return [3 /*break*/, 3];
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User)
                        .createQueryBuilder("user")
                        .where("user.id = :id", { id: userIdx })
                        .getOne()];
            case 2:
                user = _a.sent();
                accessToken = jsonwebtoken_1.default.sign({ userId: user.userId }, process.env.SHA_AT, {
                    expiresIn: 3600,
                });
                return [2 /*return*/, { userId: user.userId, accessToken: accessToken }];
            case 3: return [2 /*return*/, false];
        }
    });
}); };
module.exports = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken;
    return __generator(this, function (_a) {
        try {
            if (req.headers.authorization) {
                accessToken = req.headers.authorization.slice(7);
                jsonwebtoken_1.default.verify(accessToken, process.env.SHA_AT, function (err, decoded) { return __awaiter(void 0, void 0, void 0, function () {
                    var refreshObj;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(err || decoded.exp - decoded.iat < 600)) return [3 /*break*/, 2];
                                return [4 /*yield*/, refresh(req.cookies.refreshToken)];
                            case 1:
                                refreshObj = _a.sent();
                                if (!refreshObj) {
                                    res.status(403).send({ message: "token expired" });
                                }
                                else {
                                    req.userId = refreshObj.userId;
                                    req.accessToken = refreshObj.accessToken;
                                    next();
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                req.userId = decoded.userId;
                                next();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
            else {
                next();
            }
        }
        catch (err) {
            console.log("토큰 검사", err);
            res.status(400).send({ message: "someting wrong" });
        }
        return [2 /*return*/];
    });
}); };
//# sourceMappingURL=verification.js.map