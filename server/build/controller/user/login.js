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
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var typeorm_1 = require("typeorm");
var User_1 = require("../../entity/User");
var Refresh_1 = require("../../entity/Refresh");
Promise.resolve().then(function () { return __importStar(require("dotenv/config")); });
module.exports = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, password, hashPW, userData, nickName, profileImage, refreshData, hashedIdx, accessToken, refreshToken, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                hashPW = crypto_1.default
                    .createHmac("sha256", process.env.SHA_PW)
                    .update(password)
                    .digest("hex");
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User)
                        .createQueryBuilder("user")
                        .where("user.userId = :userId", { userId: userId })
                        .andWhere("user.password = :password", { password: hashPW })
                        .leftJoinAndSelect("user.refresh", "refresh")
                        .getOne()];
            case 2:
                userData = _b.sent();
                if (!userData) {
                    res.status(401).send({ message: "unregistered user" });
                    return [2 /*return*/];
                }
                nickName = userData.nickName;
                profileImage = userData.profileImage;
                refreshData = void 0;
                hashedIdx = void 0;
                if (!!userData.refresh) return [3 /*break*/, 3];
                refreshData = new Refresh_1.Refresh();
                return [3 /*break*/, 5];
            case 3:
                hashedIdx = userData.refresh.hashedIdx;
                return [4 /*yield*/, typeorm_1.getRepository(Refresh_1.Refresh)
                        .createQueryBuilder("refresh")
                        .where("refresh.hashedIdx = :hashedIdx", { hashedIdx: hashedIdx })
                        .getOne()];
            case 4:
                refreshData = _b.sent();
                _b.label = 5;
            case 5:
                accessToken = jsonwebtoken_1.default.sign({ userId: userId }, process.env.SHA_AT, {
                    expiresIn: 3600,
                });
                refreshToken = jsonwebtoken_1.default.sign({ id: userData.id }, process.env.SHA_RT, {
                    expiresIn: 2419200,
                });
                refreshData.token = refreshToken;
                return [4 /*yield*/, refreshData.save()];
            case 6:
                _b.sent();
                if (!!hashedIdx) return [3 /*break*/, 9];
                hashedIdx = crypto_1.default
                    .createHmac("sha256", process.env.SHA_RT)
                    .update(String(refreshData.id))
                    .digest("hex");
                refreshData.hashedIdx = hashedIdx;
                return [4 /*yield*/, refreshData.save()];
            case 7:
                _b.sent();
                userData.refresh = refreshData;
                return [4 /*yield*/, userData.save()];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                res
                    .cookie("refreshToken", hashedIdx, {
                    domain: "localhost",
                    path: "/",
                    sameSite: "none",
                    httpOnly: true,
                    secure: true,
                })
                    .send({
                    data: {
                        userId: userId,
                        nickName: nickName,
                        profileImage: profileImage,
                        accessToken: accessToken,
                    },
                });
                return [3 /*break*/, 11];
            case 10:
                err_1 = _b.sent();
                console.log("user-login\n", err_1);
                res.status(400).send({ message: "something wrong" });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=login.js.map